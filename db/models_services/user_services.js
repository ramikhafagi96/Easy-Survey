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

async function updateUserCredits(googleId) {
    const user = await userModel.findOneAndUpdate({ googleId: googleId }, { $inc: { 'credits': 5 } }, { new: true }); 
    if(user) 
        return user;
}


module.exports = {
    createUser,
    findUserByProfileId,
    findUserById,
    updateUserCredits
};