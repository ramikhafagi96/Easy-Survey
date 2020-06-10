const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userServices = require('../db/models_services/user_services');
const CALLBACKURL = '/v1/easy-survey/auth/google/callback';

passport.serializeUser((user, done) => {
    // set user id as a cookie in the user's browser
    done(null, user.id); //saved to session req.session.passport.user = {id: '..'}
});

passport.deserializeUser(async (id, done) => {
    const user = await userServices.findUserById(id);
    done(null, user); // user object attaches to the request as req.user
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
            const existingUser = await userServices.findUserByProfileId(profile.id);
            if(existingUser) {
                console.log("existing user", existingUser);
                done(null, existingUser);
            } else{
                const newUser = await userServices.createUser({ googleId: profile.id });
                console.log("new user:",newUser);
                done(null, newUser);
            }
        }
    )
);