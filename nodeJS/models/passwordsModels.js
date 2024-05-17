const pool = require('../db.js');
const bcrypt = require('bcryptjs');

async function authenticateUser(username, password) {
    try {
        // קבלת הסיסמה לפי שם המשתמש
        const sql = `SELECT passwords.password1 
                     FROM users 
                     INNER JOIN passwords ON users.password_id = passwords.id 
                     WHERE users.username = ?`;
        const [result] = await pool.query(sql, [username]);

        if (result.length === 0) {
            throw new Error('User not found');
        }

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function createPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO passwords (`password1`) VALUES(?)';
        const [result] = await pool.query(sql, [hashedPassword]);
        console.log(result);
        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function deletePassword(id) {
    try {
        const sql = 'DELETE FROM passwords WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result;
    } catch (err) {
        console.error('Error deleting password:', err);
        throw err;
    }
}

async function updatePassword(id, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'UPDATE passwords SET password1 = ? WHERE id = ?';
        const [result] = await pool.query(sql, [hashedPassword, id]);
        return result;
    } catch (err) {
        console.error('Error updating password:', err);
        throw err;
    }
}

module.exports = { updatePassword, deletePassword, authenticateUser, createPassword };