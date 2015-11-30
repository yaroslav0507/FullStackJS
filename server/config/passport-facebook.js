var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var callbackURL = callbackURL = "http://localhost:7000/login/facebook/callback" || "http://styleworks.herokuapp.com/";
console.log(callbackURL);

passport.use('facebook', new FacebookStrategy({
        clientID: "552590871558754",
        clientSecret: "e98b764a2b7fba10da3704e700f359e6",
        callbackURL: callbackURL
    },

    function (access_token, refresh_token, profile, done) {
        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            User.findOne({'fb.id': profile.id}, function (err, user) {
                console.log(profile);
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them

                    var newUser = new User({
                        fb: {
                            id: profile.id, // set the users facebook id
                            access_token: access_token, // we will save the token that facebook provides to the user
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName, // look at the passport user profile to see how names are returned
                            email: profile.emails[0].value || null // facebook can return multiple emails so we'll take the first
                        }
                    });

                    newUser.save(function (err) {
                        if (err) {
                            return next(err);
                        }



                        return done(null, newUser);
                    });
                }
            });
        });
    }));