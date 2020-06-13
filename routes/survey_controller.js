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
    const events = _.map(req.body, ({ email, url }) => {
        const pathName = new URL(url).pathname;
        console.log("pathname", pathName);
        const p = new Path('/api/survey/response/:surveyId/:choice');
        const match = p.test(pathName);
        if(match)
            return { email, surveyId: match.surveyId, choice: match.choice};
    });
    const compactEvents = _.compact(events); // remove undefined events
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); // make sure we get only one response from one email on a survey
    console.log(uniqueEvents);
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