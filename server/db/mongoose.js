const mongoose = require('mongoose')

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds117623.mlab.com:17623/todoapp-db', { useNewUrlParser: true });

module.exports = {
    mongoose
}