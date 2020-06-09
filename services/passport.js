const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CALLBACKURL = 'v1/easy-survey/auth/google/callback';

// Passport Configuration

// Google Strategy Configuration
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