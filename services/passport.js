const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = new (require('../db/models_services/user_service'))();
const CALLBACKURL = '/v1/easy-survey/auth/google/callback';

passport.serializeUser((user, done) => {
    // set user id as a cookie in the user's browser
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userService.findUserById(id);
    done(null, user);
});


// Passport Configuration

// Google Strategy Configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: CALLBACKURL
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await userService.findUserByProfileId(profile.id);
            if(existingUser) {
                done(null, existingUser);
            } else{
                const newUser = await userService.createUser({ googleId: profile.id });
                done(null, newUser);
            }
        }
    )
);