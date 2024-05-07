const model = require('../models/commentsModels');

async function create(postId, name,email, body) {
    try {
        return model.createComment(postId, name,email, body);
    } catch (err) {
        throw err;
    }
}

async function update(id, postId, name,email, body) {
    try {
        return model.updateComment(id, postId, name,email, body);
    } catch (err) {
        throw err;
    }
}

async function deleteComment(id) {
    try {
        return model.deleteComment(id);
    } catch (err) {
        throw err;
    }
}

async function getByPostId(postId) {
    try {
        return model.getByPostId(postId);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getComment(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getById, deleteComment, update,getByPostId }