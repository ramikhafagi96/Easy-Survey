const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CALLBACKURL = '/v1/easy-survey/auth/google/callback';

const userService = new (require('../db/models_services/user_service'))();
// Passport Configuration

// Google Strategy Configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: CALLBACKURL
        },
        (accessToken, refreshToken, profile, done) => {
            if(!userService.findUserByProfileId(profile.id)) {
                userService.createUser({ googleId: profile.id });
            } else{
                console.log("already exists"); 
            }
        }
    )
);