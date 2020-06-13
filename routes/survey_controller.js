const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const surveyServices = require('../db/models_services/survey_services');
const userServices = require('../db/models_services/user_services');
const { processSurveyObject } = require('../helpers/survey_helpers');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const { sendMail } = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/survey_template');


router.post('/', requireLogin, requireCredits, async (req, res) => {
    const surveyObject = new surveyServices.surveyModel(processSurveyObject(req.body,req.user.id));
    const template = surveyTemplate(surveyObject);
    try {
        await sendMail(surveyObject,template);
        await surveyServices.createSurvey(surveyObject);
        const user = await userServices.deductUserCredits(req.user.googleId);
        res.send(user);
    } catch(err) {
        res.status(422).send(err);
    }
});

router.post('/webhooks', (req, res) => {
    const p = new Path('/api/survey/response/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // remove undefined responses
      .uniqBy('email', 'surveyId') // get unique response from an email on a survey
      .value()
      .forEach(({ surveyId, email, choice }) => {
            surveyServices.registerRecipientResponse(surveyId, email, choice);
      })
      .value();
    res.send({});
});

router.get('/response/:surveyId/:choice', (req,res) => {
    res.send('Thank you for voting');
});

router.get('/thanks', (req, res) => {
    res.send('Thanks for voting :)');
})

module.exports = function (indexRouter) {
    indexRouter.use('/survey',router);
}