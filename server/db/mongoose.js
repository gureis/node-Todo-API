const mongoose = require('mongoose')

//try process.env.MONGODB_URI if using addons
const mlab = 'mongodb://gurei:th3Aw3Som3dB@ds117623.mlab.com:17623/todoapp-db';
// const local = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(mlab, { useNewUrlParser: true });

module.exports = {
    mongoose
}