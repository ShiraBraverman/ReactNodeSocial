const model = require('../models/usersModels');

async function create(name, price, description){
    try{
        return model.createToy(name, price, description);
    }catch(err){
        throw err;
    }
    
}

async function getAll(){

}

async function getById(){

}

module.exports = {create, getAll, getById}
