const passport = require('passport');
const express = require('express');
const router = express.Router();

/*----------------Google Authentication-------------------*/
router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"] // info we need from google about the user
}));

router.get('/google/callback', passport.authenticate('google'));

router.get('/logout', (req,res) => {
    req.logOut(); // it takes the cookie that contais the user id and kill the cookie
    res.send({ message: "user logged out"});
});
/*--------------------------------------------------------*/
module.exports = function (indexRouter) {
    indexRouter.use("/auth", router);
};