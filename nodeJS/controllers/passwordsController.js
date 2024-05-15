const bcrypt = require('bcryptjs');
const model = require('../models/passwordsModels');

async function create(userId, password) {
    try {
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
        const result = await model.authenticateUser(username, password);
        if (result[0].length > 0) {
            const hashedPassword = result[0][0].password1;
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } else {
            return false; // משתמש לא נמצא
        }
    } catch (err) {
        throw err;
    }
}

module.exports = { create, deletePassword, update, authenticate };