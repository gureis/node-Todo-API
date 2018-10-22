const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

require('./db/mongoose')
const {Users} = require('./models/user')
const {Todos} = require('./models/todo')
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todos({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todos.find({})
        .then(todos => res.send({todos}), e => res.status(400).send(e));
});

app.get(`/todos/:id`, (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send({error: `ID is Invalid`});
    }
    Todos.findById(id).then(todo => {
        if(!todo)
            return res.status(404).send({error: `Todo not Found`});
        res.status(200).send({ todo });
    }).catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(400).send({error: "Id is invalid, please try again."});
    
    Todos.findByIdAndRemove(id).then(todo => {
        if(!todo)
            return res.status(404).send({error: `Todo with id of ${id} was not found.`});
        res.status(200).send({todo});
    }).catch(e => res.status(400).send({test: 'test'}));
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) 
        return res.status(400).send();
    
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todos.findByIdAndUpdate(id, {$set: body}, {new: true}).then(todo => {
        if(!todo) 
            return res.status(400).send();

        res.status(200).send({todo});
    }).catch(e => res.status(400).send());

});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new Users({ ...body });
    user.save().then(() => {
        return user.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).status(200).send(user);
    }).catch( e => {
            res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user);
});

app.get('/users', (req, res) => {
    Users.find({})
        .then(users => res.send({ users }), e => res.status(400).send(e));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {
    app
}