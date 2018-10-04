const mongoose = require('mongoose')

const mlab = 'mongodb://gurei:th3Aw3Som3dB@ds117623.mlab.com:17623/todoapp-db';
const local = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(mlab);

module.exports = {
    mongoose
}