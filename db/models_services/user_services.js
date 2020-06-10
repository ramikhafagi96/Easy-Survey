const mongoose = require('mongoose');
const userModel = mongoose.model('users');

async function createUser(userObject) {
    const user = await new userModel(userObject).save();
    return user;
}

async function findUserByProfileId(googleId) {
    const user = await userModel.findOne({ googleId: googleId });
    return user;
}

async function findUserById(id) {
    const user = await userModel.findById(id);
    return user;
}


module.exports = {
    createUser,
    findUserByProfileId,
    findUserById
};