require('dotenv').config();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("Error in google strategy passport ",err);return;
        }
        console.log(profile);
        if(user){
            // if user is found
            return done(null, user);
        }else{
            // if user not found sign in the user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err, user){
                if(err){console.log("Error in google strategy passport ",err);return;}
                return done(null, user);
            })
        }

    });

  }
));


module.exports = passport;