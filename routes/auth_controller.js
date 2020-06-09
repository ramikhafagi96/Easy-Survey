const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"] // info we need from google about the user
}));

router.get('/google/callback', passport.authenticate('google'));

module.exports = function (indexRouter) {
    indexRouter.use("/auth", router);
};