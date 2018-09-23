const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'What I want to do goes here again',
        completed: false
    }, (err, res) => {
        if(err)
            return console.log('Unable to insert Todo', err);
        console.log(res.ops);
    });

    // db.collection('Users').insertOne({
    //     name: 'Gus',
    //     age: 22,
    //     location: 'Not exactly here'
    // }, (err, res) => {
    //     if(err)
    //         return console.log('Unable to insert User', err);
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    client.close();
});