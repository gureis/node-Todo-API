const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Users} = require('./models/user')
const {Todos} = require('./models/todo')

const port = 3000
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
    }, e => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {
    app
}