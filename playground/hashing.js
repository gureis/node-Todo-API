const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

// const msg = 'I\'m a sha256 msg';
// const hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);

const data = {
    id: 4,
}

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

const token = jwt.sign(data, 'aedccede');
console.log(token);

const decoded = jwt.verify(token, 'aedccede');
console.log(decoded);