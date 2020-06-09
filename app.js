const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./db/models/user');
require('./services/passport'); // because we're not requiring anything from it
var indexRouter = require('./routes/index');

// Binding routes
app.use('/v1/easy-survey',indexRouter(app));

// Connect to MongoDB database
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Listen to the enviroment port (Heroku) or the development port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}!`);
});