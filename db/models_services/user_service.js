const mongoose = require('mongoose');
const userModel = mongoose.model('users');

class UserService {
    async createUser(userObject) {
        const user = await new userModel(userObject).save();
        return user;
    }

    async findUserByProfileId(googleId) {
        const user = await userModel.findOne({ googleId: googleId });
        return user;
    }

    async findUserById(id) {
        const user = await userModel.findById(id);
        return user;
    }
}

module.exports = UserService;