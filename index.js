const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const PORT = process.env.PORT || 5000;
const CALLBACKURL = '/auth/google/callback';

// Passport Configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: CALLBACKURL
        },
        accessToken => {
            console.log(accessToken);
        }
    )
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}));

app.get('/', (req, res) => {
    res.send({ message: "Up and Running!" });
});

app.listen(PORT);