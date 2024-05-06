const pool = require('../db.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createUser(username, email, phone) {
    try {
        const sql = 'INSERT INTO users (`username`, `email`, `phone`) VALUES(?, ?, ?)';
        const result = await pool.query(sql, [username, email, phone]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(id) {
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id,username, email, phone) {
    try {
        const sql = 'UPDATE user SET username = ?, email = ?, phone = ? WHERE id = ?';
        const result = await pool.query(sql, [username, email, phone,id]);
        return result;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

module.exports = { updateUser, getUser, getUsers, deleteUser, createUser }