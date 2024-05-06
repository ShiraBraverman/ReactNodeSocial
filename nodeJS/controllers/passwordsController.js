const model = require('../models/passwordsModels');

async function create(userId, password) {
    try {
        return model.createPassword(userId,password);
    } catch (err) {
        throw err;
    }
}

async function update(id,userId,password) {
    try {
        return model.updatePassword(id, userId,password);
    } catch (err) {
        throw err;
    }
}

async function deletePassword(id) {
    try {
        return model.deletePassword(id);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getPasswords();
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getPassword(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deletePassword, update }