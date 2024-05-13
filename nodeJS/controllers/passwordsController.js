const model = require('../models/passwordsModels');

async function create(userId, password) {
    try {
        return model.createPassword(userId, password);
    } catch (err) {
        throw err;
    }
}

async function update(id, userId, password) {
    try {
        return model.updatePassword(id, userId, password);
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

async function authenticate(username, password) {
    console.log('Authenticating');
    try {
        console.log('Authenticating');
        const isAuthenticated = await model.authenticateUser(username, password);

        return isAuthenticated;
    } catch (err) {
        throw err;
    }
}

module.exports = { create, deletePassword, update, authenticate }