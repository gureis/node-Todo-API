const mongoose = require('mongoose')

const Todo = new mongoose.Schema({
    text: { type: String, required: true, minlength: 1, trim: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
});

const Todos = mongoose.model('Todos', Todo);

module.exports = {
    Todos
}