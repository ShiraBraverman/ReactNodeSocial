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

async function update(id, password) {
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
        console.log('result ', result[0]);
        const hashedPassword = result[0].password1;
        console.log('hashedPassword ', hashedPassword);
        console.log('Password ', password)
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        throw err;
    }
}

module.exports = { create, deletePassword, update, authenticate };