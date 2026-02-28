/* Plugins. */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/* Model. */
const User = require('../models/Users');

/* Helpers. */
const { google } = require('../../config');

passport.use(
    new GoogleStrategy(
        {
            clientID: google.clientId,
            clientSecret: google.secretId,
            callbackURL: "http://localhost:3000/api/v1/auth/googleLogin"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let userDetails = await User.findOne({ googleId: profile.id });

                if(!userDetails) {
                    userDetails = new User({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        googleId: profile.id
                    });
                    await userDetails.save();
                };
                
                done(null, userDetails);

            } catch (error) { done(error, null) };
        }
    )
);

passport.serializeUser((user, done) => { done(null, user.id) });

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});