const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    recipients: {
        type: [String],
        required: true
    }
});

mongoose.model('surveys', surveySchema);