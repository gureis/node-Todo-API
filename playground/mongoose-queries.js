const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todos} = require('./../server/models/todo');
const {Users} = require('./../server/models/user')

const id = '5bad17477efb1407d8545490';
const userID = '5ba7db143fd33946a803702d';

if(!ObjectID.isValid(id)) {
    return console.log('Id not Valid')
}

Users.findById(userID).then(user => {
    if(!user)
        return console.log('User Not Found');
    console.log(`User: ` + JSON.stringify(user, undefined, 4));
}).catch(e => console.log(e));

Todos.find({
    _id: id
}).then(todos => {
    console.log(`Todos: ${todos}`);
});

Todos.findOne({
    _id: id
}).then(todo => {
    console.log(`Todo: ${todo}`)
});

Todos.findById(id).then(todo => {
    if(!todo)
        return console.log('Id not Found');
    console.log(`Todo by ID: ${todo}`)
}).catch(e => console.log(e));