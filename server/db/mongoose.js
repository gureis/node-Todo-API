const mongoose = require('mongoose')

mongoose.connect('mongodb://<admin>:<th3@w3Som3dB>@ds117623.mlab.com:17623/todoapp-db', { useNewUrlParser: true });

module.exports = {
    mongoose
}