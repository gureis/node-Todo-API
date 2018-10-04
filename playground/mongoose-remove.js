require('../server/db/mongoose');

const {ObjectID} = require('mongodb');

const {Todos} = require('../server/models/todo');
const {Users} = require('../server/models/user')

const id = '5bb67cc77baa7a2de8c2d073';
const userID = '5ba7db143fd33946a803702d';

if(!ObjectID.isValid(id)) {
    return console.log('Id is INvalid');
}

// Todos.findOneAndRemove({_id: id}).then(todo => {
//         console.log(todo);
// });

Todos.findByIdAndRemove(id).then(todo => console.log(todo));