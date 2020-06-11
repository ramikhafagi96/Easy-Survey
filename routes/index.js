var express = require('express');
var router = express.Router();
// Require Routes
auth_controller = require('./auth_controller');
user_controller = require('./user_controller');

module.exports = () => {
    auth_controller(router);
    user_controller(router);
    return router;
};