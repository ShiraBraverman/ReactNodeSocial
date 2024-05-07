const model = require('../models/todosModels');

async function create(userId, title, completed) {
    try {
        return model.createTodo(userId, title, completed);
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

async function getByUserid(userid) {
    try {
        return model.getByUserid(userid);
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

module.exports = { create, getByUserid, getById, deleteTodo, update }