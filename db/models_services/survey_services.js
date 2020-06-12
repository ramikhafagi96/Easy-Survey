const mongoose = require('mongoose');
const surveyModel = mongoose.model('surveys');

async function createSurvey(surveyObject) {
    const survey = surveyObject.save();
    return survey;
}

async function registerRecipientResponse() {
    
}

module.exports = {
    createSurvey,
    surveyModel
}