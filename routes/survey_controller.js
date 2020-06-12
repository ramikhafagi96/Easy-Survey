const express = require('express');
const router = express.Router();
const surveyServices = require('../db/models_services/survey_services');
const { processSurveyObject } = require('../helpers/survey_helpers');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const { sendMail } = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/survey_template');
router.post('/', requireLogin, requireCredits, async (req, res) => {
    const surveyObject = processSurveyObject(req.body,req.user.id);
    const template = surveyTemplate(surveyObject);
    sendMail(surveyObject,template);
    // const survey = surveyServices.createSurvey(surveyObject);

});

module.exports = function (indexRouter) {
    indexRouter.use('/survey',router);
}