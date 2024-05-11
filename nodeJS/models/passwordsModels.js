const pool = require('../db.js');

async function authenticateUser(username, password) {
    try {
        // בצע שאילתת SQL לבדיקת אימות המשתמש
        const sql = 'SELECT * FROM passwords WHERE userId = ? AND password1 = ?';
        const result = await pool.query(sql, [username, password]);
        // אם נמצא משתמש עם שם משתמש וסיסמה תואמים
        // החזר true
        // אחרת, החזר false
        return result[0].length > 0;
    } catch (err) {
        throw err;
    }
}

async function createPassword(userId, password) {
    try {
        const sql = 'INSERT INTO passwords (`userId`, `password1`) VALUES(?, ?, ?)';
        const result = await pool.query(sql, [userId, password]);
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