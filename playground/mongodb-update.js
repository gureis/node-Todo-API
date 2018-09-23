const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err)
        return console.log('Unable to connect to the server');
    console.log('Connected to the Mongo Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate(
    //     {_id: new ObjectID('5ba5249006b46c0fd4f27de0')},
    //     {$set: {completed: true}}, {
    //         returnOriginal: false
    //     }).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ba52889a2b5a20aa01925e4')
    }, {
        $set: {
            name: 'Jen'
        },
        $inc: {
            age: 1,
        }
    }, {
        returnOriginal: false
    }).then(res => {
        console.log(res);
    });

    client.close();
});