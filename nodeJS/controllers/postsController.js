const model = require('../models/postsModels');

async function create(userId, title, body) {
    try {
        return model.createTodo(userId, title, body);
    } catch (err) {
        throw err;
    }
}

async function update(id, userId, title, completed) {
    try {
        return model.updateTodo(id, userId, title, completed);
    } catch (err) {
        throw err;
    }
}

async function deleteTodo(id) {
    try {
        return model.deleteTodo(id);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getTodo();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getTodo(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteTodo, update }