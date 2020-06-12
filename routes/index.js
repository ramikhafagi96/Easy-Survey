var express = require('express');
var router = express.Router();
// Require Routes
const auth_controller = require('./auth_controller');
const user_controller = require('./user_controller');
const survey_controller = require('./survey_controller');
module.exports = () => {
    auth_controller(router);
    user_controller(router);
    survey_controller(router);
    return router;
};