const mongoose = require('mongoose');
const userModel = mongoose.model('users');

class UserService {
    createUser(userObject) {
        const user = new userModel(userObject).save();
        if(user) {
            return user;
        }
    }

    async findUserByProfileId(googleId) {
        const user = await userModel.findOne({ googleId: googleId });
        if(user) {
            return true;
        } else {
            return false
        }
    }
}

module.exports = UserService;