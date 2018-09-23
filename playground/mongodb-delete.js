const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({ text: 'What I want to do goes here again'}).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Todos').deleteOne({ text: 'What I want to do goes here again' }).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Todos').findOneAndDelete({ text: 'What I want to do goes here again' }).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name: 'Gus'}).then((res) => {
    //     console.log(res);
    // });
   
    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5ba5278e06b7a7324068f76e')}).then((res) => {
        console.log(res);
    });

    client.close();
});