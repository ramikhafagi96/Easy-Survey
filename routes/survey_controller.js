const express = require('express');
const router = express.Router();
const surveyServices = require('../db/models_services/survey_services');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
router.post('/survey', requireLogin, requireCredits, async (req, res) => {
    const survey = surveyServices.createSurvey(req.body,req.user.id);
});

module.exports = function (indexRouter) {
    indexRouter.use('/survey',router);
}