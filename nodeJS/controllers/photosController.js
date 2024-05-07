const model = require('../models/photosModels');

async function create(userId, albumId,title,url,thumbnailUrl) {
    try {
        return model.createPhoto(userId, albumId,title,url,thumbnailUrl);
    } catch (err) {
        throw err;
    }
}

async function update(id,albumId,title,url,thumbnailUrl) {
    try {
        return model.updatePhoto(id, albumId,title,url,thumbnailUrl);
    } catch (err) {
        throw err;
    }
}

async function deletePhoto(id) {
    try {
        return model.deletePhoto(id);
    } catch (err) {
        throw err;
    }
}

async function getAll(albumId, page, limit) {
    try {
        return model.getPhotos(albumId, page, limit);
    } catch (err) {
        throw err;
    }
}

async function getById(id) {
    try {
        return model.getPhoto(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { create, getAll, getById, deletePhoto, update }