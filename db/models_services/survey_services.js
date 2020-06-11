const mongoose = require('mongoose');
const surveyModel = mongoose.model('surveys');

async function createSurvey(surveyObject, userId) {
    surveyObject.recipients = surveyObject.recipients.split(',')
        .map(email => { 
            return { email: email.trim() } 
        });
    surveyObject._user = userId;
    const survey = await new surveyModel(surveyObject).save();
    return survey;
}

module.exports = {
    createSurvey
}