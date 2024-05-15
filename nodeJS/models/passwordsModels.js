const pool = require('../db.js');
const bcrypt = require('bcryptjs');

async function authenticateUser(username, password) {
    try {
        const sql = 'SELECT * FROM passwords WHERE userId = ?';
        const result = await pool.query(sql, [username]);
        return result;
    } catch (err) {
        throw err;
    }
}
async function createPassword(userId, password) {
    try {
        const sql = 'INSERT INTO passwords (`userId`, `password1`) VALUES(?, ?)';
        const result = await pool.query(sql, [userId, password]);
        console.log(result)
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deletePassword(id) {
    try {
        const sql = 'DELETE FROM passwords WHERE id = ?';
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting password:', err);
        throw err;
    }
}

async function updatePassword(id, userId, password) {
    try {
        const sql = 'UPDATE passwords SET userId = ?, password1 = ? WHERE id = ?';
        const result = await pool.query(sql, [userId, password, id]);
        return result;
    } catch (err) {
        console.error('Error updating password:', err);
        throw err;
    }
}

module.exports = { updatePassword, deletePassword, authenticateUser, createPassword }