const pool = require('../db.js');
const bcrypt = require('bcryptjs');

async function authenticateUser(username, password) {
    try {
        // בצע שאילתת SQL לבדיקת אימות המשתמש
        const sql = 'SELECT * FROM passwords WHERE userId = ?';
        const result = await pool.query(sql, [username]);

        // אם נמצא משתמש עם המזהה המשתמש נסה להשוות את הסיסמה
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