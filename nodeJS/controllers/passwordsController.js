const bcrypt = require('bcryptjs');
const model = require('../models/passwordsModels');

async function create(userId, password) {
    try {
        // הצפנת הסיסמה
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log('encryptedPassword')
        console.log(encryptedPassword)
        return model.createPassword(userId, encryptedPassword);
    } catch (err) {
        throw err;
    }
}

async function update(id, userId, password) {
    try {
        // הצפנת הסיסמה
        const encryptedPassword = await bcrypt.hash(password, 10);
        return model.updatePassword(id, userId, encryptedPassword);
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
    try {
        console.log('Authenticating');
        const isAuthenticated = await model.authenticateUser(username, password);

        return isAuthenticated;
    } catch (err) {
        throw err;
    }
}

module.exports = { create, deletePassword, update, authenticate };
