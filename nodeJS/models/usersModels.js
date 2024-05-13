const pool = require('../db.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users INNER JOIN addresses ON users.id = addresses.user_id';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT users.*, addresses.* FROM users INNER JOIN addresses ON users.id = addresses.user_id WHERE users.id = ?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function getByUsername(username) {
    try {
        const sql = 'SELECT users.*, addresses.* FROM users INNER JOIN addresses ON users.id = addresses.user_id WHERE users.username = ?';
        const result = await pool.query(sql, [username]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createUser(username, email, phone, street, city) {
    try {
        console.log(4)
        const userSql = 'INSERT INTO users (`username`, `email`, `phone`) VALUES (?, ?, ?)';
        const userResult = await pool.query(userSql, [username, email, phone]);
        console.log(5)

        const userId = userResult[0].insertId;
        
        console.log(userId)

        const addressSql = 'INSERT INTO addresses (`user_id`, `street`, `city`) VALUES (?, ?, ?)';
        await pool.query(addressSql, [userId, street, city]);

        return userResult[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(id) {
    try {
        // מחיקת המשתמש
        const sqlDeleteUser = 'DELETE FROM users WHERE id = ?';
        await pool.query(sqlDeleteUser, [id]);

        // מחיקת הכתובת המתאימה למשתמש
        const sqlDeleteAddress = 'DELETE FROM addresses WHERE user_id = ?';
        await pool.query(sqlDeleteAddress, [id]);

        console.log('User and associated address deleted successfully');    } catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        }
    }
    
    async function updateUser(id, username, email, phone, street, city) {
        try {
            // עדכון פרטי המשתמש
            const sqlUpdateUser = 'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?';
            await pool.query(sqlUpdateUser, [username, email, phone, id]);
    
            // עדכון כתובת המשתמש
            const sqlUpdateAddress = 'UPDATE addresses SET street = ?, city = ? WHERE user_id = ?';
            await pool.query(sqlUpdateAddress, [street, city, id]);
    
            console.log('User and associated address updated successfully');
        } catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
    }
    
    module.exports = { updateUser, getUser, getUsers, deleteUser, createUser, getByUsername }
    
