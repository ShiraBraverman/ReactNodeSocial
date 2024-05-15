const pool = require('../db.js');

async function getByUserid(userid) {
    try {
        const sql = 'SELECT * FROM albums where userId=?';
        const [rows, fields] = await pool.query(sql, [userid]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getAlbum(id) {
    try {
        const sql = 'SELECT * FROM albums where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createAlbum(userId, title) {
    try {
        const sql = "INSERT INTO albums (`userId`, `title`) VALUES(?, ?)";
        const result = await pool.query(sql, [userId, title]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deleteAlbum(id) {
    try {
        const sql = `DELETE FROM albums WHERE id = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting album:', err);
        throw err;
    }
}

async function updateAlbum(id, userId, title) {
    try {
        const sql = `UPDATE albums SET userId = ?, title = ? WHERE id = ?`;
        const result = await pool.query(sql, [userId, title, id]);
        return result;
    } catch (err) {
        console.error('Error updating album:', err);
        throw err;
    }
}

module.exports = { updateAlbum, getAlbum, getByUserid, deleteAlbum, createAlbum }