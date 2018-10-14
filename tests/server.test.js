const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb');

const {app} = require('./../server/server')
const {Todos} = require('./../server/models/todo')

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo', 
    completed: true,
    completedAt: new Date()
    }, {
    _id: new ObjectID(),
    text: 'Third test todo',
}];

beforeEach(done => {
    Todos.deleteMany({}).then(() => {
        return Todos.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err)
                    return done(err);
                Todos.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create todo w/ invalid ody data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);
                Todos.find().then(todos => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch(e => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', done => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', done => {
        const id = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', done => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .expect(res => {
                expect(res.body.error).toBe('Todo not Found');
            })
            .end(done);
    });

    it('should return 400 for non-object IDs', done => {
        const id = '12444';
        request(app)
            .get(`/todos/${id}`)
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('ID is Invalid');
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', done => {
        const id = todos[2]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[2].text);
            })
            .end((err, res) => {
                if (err)
                    return done(err);

                Todos.findById(id).then(todo => {
                    expect(todo).toNotExist();
                    done();
                }).catch(e => done(e));
            });
    });

    it('should return 404 if todo not found', done => {
        const id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect(res => {
                expect(res.body.error).toBe(`Todo with id of ${id} was not found.`);
            })
            .end(done);
    });

    it('should return 400 if ID is invalid', done => {
        const id = '1241531';
        request(app)
            .delete(`/todos/${id}`)
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('Id is invalid, please try again.');
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', done => {
        const id = todos[0]._id.toHexString();
        const updatedTodo = {
            text: 'this text was updated',
            completed: true
        };
        request(app)
            .patch(`/todos/${id}`)
            .send(updatedTodo)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(updatedTodo.text);
                expect(res.body.todo.completed).toBe(updatedTodo.completed);
                expect(res.body.todo.completedAt).toBeA('string');
            })
            .end(done);

    });

    it('should clear completedAt when todo is not completed', done => {
        const id = todos[1]._id.toHexString();
        const updatedTodo = {
            text: 'This is the second updated todo',
            completed: false
        };
        request(app)
            .patch(`/todos/${id}`)
            .send(updatedTodo)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(updatedTodo.text);
                expect(res.body.todo.completed).toBe(updatedTodo.completed);
                expect(res.body.todo.completedAt) .toNotExist();
            })
            .end(done);
    });

});