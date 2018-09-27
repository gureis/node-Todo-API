const mongoose = require('mongoose')

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds117623.mlab.com:17623/todoapp-db' || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
}