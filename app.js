const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./db/models/user');
require('./db/models/survey');
require('./services/passport'); // because we're not requiring anything from it
var indexRouter = require('./routes/index');

// Binding routes
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30*24*60*60*1000, // last for 30 days
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session()); // to use cookies
app.use('/api',indexRouter(app));
// Connect to MongoDB database
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

// Listen to the enviroment port (Heroku) or the development port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}!`);
});