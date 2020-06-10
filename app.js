const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./db/models/user');
require('./services/passport'); // because we're not requiring anything from it
var indexRouter = require('./routes/index');

// Binding routes
app.use(cookieSession({
    maxAge: 30*24*60*60*1000, // last for 30 days
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session()); // to use cookies
app.get('/', (req,res) => {
    res.send({ message: "Up and Running!"});
})
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