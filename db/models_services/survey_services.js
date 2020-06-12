const mongoose = require('mongoose');
const surveyModel = mongoose.model('surveys');

async function createSurvey(surveyObject) {
    const survey = await new surveyModel(surveyObject).save();
    return survey;
}

module.exports = {
    createSurvey
}