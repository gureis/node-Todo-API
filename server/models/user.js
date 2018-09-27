const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: { type: String, required: true, trim: true, minlength: 1 }
});

const Users = mongoose.model('Users', User);

module.exports = {
    Users
}