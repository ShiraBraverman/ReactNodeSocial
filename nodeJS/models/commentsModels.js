const pool = require('../db.js');

async function getByPostId(postId) {
    try {
        const sql = 'SELECT * FROM comments where postId=?';
        const [rows, fields] = await pool.query(sql, [postId]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getComment(id) {
    try {
        const sql = 'SELECT * FROM comments where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createComment(postId, name, email, body) {
    try {
        const sql = 'INSERT INTO comments (`postId`, `name`,`email`, `body`) VALUES(?, ?, ?, ?)';
        const result = await pool.query(sql, [postId, name, email, body]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteComment(id) {
    try {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
}

async function updateComment(id, postId, name, email, body) {
    try {
        const sql = 'UPDATE comments SET postId = ?, name = ?, email = ?, body = ? WHERE id = ?';
        const result = await pool.query(sql, [postId, name, email, body, id]);
        return result;
    } catch (err) {
        console.error('Error updating comment:', err);
        throw err;
    }
}

module.exports = { updateComment, getComment, getByPostId, deleteComment, createComment }