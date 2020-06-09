var express = require('express');
var router = express.Router();
// Require Routes
auth_controller = require('./auth_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ message: "Up and Running!" });
  });

module.exports = () => {
    auth_controller(router);
    return router;
};