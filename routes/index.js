var express = require('express');
const survey_controller = require('./survey_controller');
var router = express.Router();
// Require Routes
auth_controller = require('./auth_controller');
user_controller = require('./user_controller');
survey_controller = require('./survey_controller');
module.exports = () => {
    auth_controller(router);
    user_controller(router);
    survey_controller(router);
    return router;
};