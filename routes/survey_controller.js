const express = require('express');
const router = express.Router();




module.exports = function (indexRouter) {
    indexRouter.use('/survey',router);
}