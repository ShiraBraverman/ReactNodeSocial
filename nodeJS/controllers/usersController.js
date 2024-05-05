const model = require('../models/usersModels');

async function create(name, price, description){
    try{
        return model.createToy(name, price, description);
    }catch(err){
        throw err;
    }
}

async function getAll(){
    try{
        return model.getUsers();
    }catch(err){
        throw err;
    }
}

async function getById(id){
    try{
        return model.getUser(id);
    }catch(err){
        throw err;
    }
}

module.exports = {create, getAll, getById}