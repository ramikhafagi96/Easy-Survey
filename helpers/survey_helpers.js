function processSurveyObject(surveyObject,userId) {
    surveyObject.recipients = surveyObject.recipients.split(',')
    .map(email => { 
        return { email: email.trim() } 
    });
    surveyObject._user = userId;
    return surveyObject;
}

module.exports = {
    processSurveyObject
}