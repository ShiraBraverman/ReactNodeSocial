const model = require('../models/passwordsModels');

async function create(userId, password) {
    try {
        return model.createPassword(userId,password);
    } catch (err) {
        throw err;
    }
}

async function update(id,userId,password) {
    try {
        return model.updatePassword(id, userId,password);
    } catch (err) {
        throw err;
    }
}

async function deletePassword(id) {
    try {
        return model.deletePassword(id);
    } catch (err) {
        throw err;
    }
}

async function authenticate(username, password) {
    try {
        // מצא את המשתמש על פי שם המשתמש
        const user = await User.findOne({ username: username });

        // אם המשתמש לא נמצא או הסיסמה שגויה, החזר null
        if (!user || user.password !== password) {
            return null;
        }

        // אם הסיסמה נכונה, החזר את פרטי המשתמש
        return {
            id: user._id,
            username: user.username,
            email: user.email
            // ניתן להוסיף כאן פרטים נוספים שתרצה להחזיר
        };
    } catch (err) {
        throw err;
    }
}

// async function getAll() {
//     try {
//         return model.getPasswords();
//     } catch (err) {
//         throw err;
//     }
// }

// async function getById(id) {
//     try {
//         return model.getPassword(id);
//     } catch (err) {
//         throw err;
//     }
// }

module.exports = { create,  deletePassword, update }
// module.exports = { create, getAll, getById, deletePassword, update }