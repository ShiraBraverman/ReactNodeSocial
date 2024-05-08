const pool = require('../db.js');

async function getByUserid(userid) {
    try {
        const sql = 'SELECT * FROM todos where userId=?';
        const [rows, fields] = await pool.query(sql, [userid]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getTodo(id) {
    try {
        const sql = 'SELECT * FROM todos where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createTodo(userId, title, completed) {
    try {
        const sql = 'INSERT INTO todos (`userId`, `title`, `completed`) VALUES(?, ?, ?)';
        const result = await pool.query(sql, [ userId, title, completed]);
        
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteTodo(id) {
    try {
        const sql = 'DELETE FROM todos WHERE id = ?';
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting todo:', err);
        throw err;
    }
}

async function updateTodo(id, userId, title, completed) {
    try {
        const sql = 'UPDATE todos SET userId = ?, title = ?, completed = ? WHERE id = ?';
        const result = await pool.query(sql, [userId, title, completed,id]);
        return result;
    } catch (err) {
        console.error('Error updating todo:', err);
        throw err;
    }
}

module.exports = { updateTodo, getTodo, getByUserid, deleteTodo, createTodo }