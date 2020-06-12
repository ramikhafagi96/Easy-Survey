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

async function addUserCredits(googleId) {
    const user = await userModel.findOneAndUpdate({ googleId: googleId }, { $inc: { 'credits': 5 } }, { new: true }); 
    if(user) 
        return user;
}

async function deductUserCredits(googleId) {
    const user = await userModel.findOneAndUpdate({ googleId: googleId }, { $inc: { 'credits': -1 } }, { new: true }); 
    if(user) 
        return user;
}


module.exports = {
    createUser,
    findUserByProfileId,
    findUserById,
    addUserCredits,
    deductUserCredits
};