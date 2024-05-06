const pool = require('../db.js');

async function getPasswords() {
    try {
        const sql = 'SELECT * FROM passwords';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getPassword(id) {
    try {
        const sql = 'SELECT * FROM passwords where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createPassword(userId, password) {
    try {
        const sql = "INSERT INTO passwords (`userId`, `password`) VALUES(?, ?, ?)";
        const result = await pool.query(sql, [userId, password]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deletePassword(id) {
    try {
        const sql = `DELETE FROM passwords WHERE id = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting password:', err);
        throw err;
    }
}

async function updatePassword(id, userId, password) {
    try {
        const sql = `UPDATE passwords SET userId = ?, password = ? WHERE id = ?`;
        const result = await pool.query(sql, [userId, password, id]);
        return result;
    } catch (err) {
        console.error('Error updating password:', err);
        throw err;
    }
}

module.exports = { updatePassword, getPassword, getPasswords, deletePassword, createPassword }