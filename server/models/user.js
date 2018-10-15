const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const User = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email.`
        }
    },
    password: {
        type: String, 
        required: true, 
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

User.methods = {
    generateAuthToken: function () {
        const user = this;
        const access = 'auth';
        const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

        user.tokens = user.tokens.concat([{
            access,
            token
        }]);
        return user.save().then(() => {
            return token;
        });
    },

    toJSON: function () {
        const user = this;
        const userObj = user.toObject();

        return _.pick(userObj, ['_id', 'email']);
    }
}

const Users = mongoose.model('Users', User);

module.exports = {
    Users
}