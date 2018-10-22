const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// const msg = 'I\'m a sha256 msg';
// const hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);

// const data = {
//     id: 4,
// }

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if( resultHash === token.hash) 
//     console.log('Data was not changed');
// else
//     console.log('Data was changed. Don\'t trust');

// const token = jwt.sign(data, 'aedccede');
// console.log(token);

// const decoded = jwt.verify(token, 'aedccede');
// console.log(decoded);

const password = '123@abc';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('Hash: ', hash);
    });
});

const hashedPassword = '$2a$10$6Y0.wpDYe1zVBA3UZnojieLFu5n6JE8QxOFATewE7do6F43PJzIn.';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log('Second: ', res);
});

bcrypt.compare(password, '$2a$10$0rvPKYbvXXYIQKquime6yeNZxEuFsItMUdbhs4uFYKxgREUk6WGjW', (err, res) => {
    console.log('Third: ', res);
});