const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

require('./db/mongoose')
const {Users} = require('./models/user')
const {Todos} = require('./models/todo')

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

app.post('/users', (req, res) => {
    const user = new Users({
        email: req.body.email
    });
    user.save().then(doc => {
        console.log(doc);
        res.send(doc);
    }, e => {
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

app.get('/users', (req, res) => {
    Users.find({})
        .then(users => res.send({users}), e => res.status(400).send(e));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {
    app
}