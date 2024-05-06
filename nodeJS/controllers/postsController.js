const model = require('../models/postsModels');

async function create(userId, title, body) {
    try {
        return model.createPost(userId, title, body);
    } catch (err) {
        throw err;
    }
}

async function update(id, userId, title, body) {
    try {
        return model.updatePost(id, userId, title, body);
    } catch (err) {
        throw err;
    }
}

async function deletePost(id) {
    try {
        return model.deletePost(id);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getPosts();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getPost(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deletePost, update }