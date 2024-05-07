const model = require('../models/albumsModels');

async function create(userId, title) {
    try {
        return model.createAlbum(userId, title);
    } catch (err) {
        throw err;
    }
}

async function update(id, userId, title) {
    try {
        return model.updateAlbum(id, userId, title);
    } catch (err) {
        throw err;
    }
}

async function deleteAlbum(id) {
    try {
        return model.deleteAlbum(id);
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    try {
        return model.getAlbums();
    } catch (err) {
        throw err;
    }
}

async function getByUserid(userid) {
    try {
        return model.getByUserid(userid);
    } catch (err) {
        throw err;
    }
}


async function getById(id) {
    try {
        return model.getAlbum(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deleteAlbum, update,getByUserid }