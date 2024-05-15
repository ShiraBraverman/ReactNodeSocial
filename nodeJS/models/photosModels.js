const pool = require('../db.js');

async function getPhotos(albumId, page, limit) {
    try {
        const sql = 'SELECT * FROM photos where albumId = ? LIMIT ? OFFSET ?'
        const [rows, fields] = await pool.query(sql, [albumId,limit,page*limit]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getPhoto(id) {
    try {
        const sql = 'SELECT * FROM photos where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function createPhoto(albumId, title, url, thumbnailUrl) {
    try {
        const sql = "INSERT INTO photos (`albumId`,`title`,`url`, `thumbnailUrl`) VALUES(?, ?, ?, ?)";
        const result = await pool.query(sql, [albumId, title, url, thumbnailUrl]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function deletePhoto(id) {
    try {
        const sql = `DELETE FROM photos WHERE id = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting photo:', err);
        throw err;
    }
}

async function updatePhoto(id, albumId, title, url, thumbnailUrl) {
    try {
        const sql = `UPDATE photos SET albumId = ?, title = ?, url = ?, thumbnailUrl = ? WHERE id = ?`;
        const result = await pool.query(sql, [albumId, title, url, thumbnailUrl, id]);
        return result;
    } catch (err) {
        console.error('Error updating photo:', err);
        throw err;
    }
}

module.exports = { updatePhoto, getPhoto, getPhotos, deletePhoto, createPhoto }