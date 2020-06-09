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
        (accessToken, refreshToken, profile, cb) => {
            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            console.log('profile: ', profile)
        }
    )
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ["profile", "email"] // info we need from google about the user
}));

// this is the callback route that when passport sees the code it realizes that
// the user is not attempting to be authentecated for the first time
// but attempting to turn that code into a profile
app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/', (req, res) => {
    res.send({ message: "Up and Running!" });
});

app.listen(PORT);