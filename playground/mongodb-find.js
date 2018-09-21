const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    db.collection('Todos').find({ _id: new ObjectID("5ba53893d2522b13406d86b6")}).count().then((count) => {
        console.log('Todos: ', count);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({name: 'Gus'}).toArray().then((docs) => {
        console.log(docs);
    });

    client.close();
});