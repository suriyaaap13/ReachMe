const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        // if (err) { req.flash('error', 'Invalid Username/Password'); return done(null, false); }
        if (!user||user.password!=password) { req.flash('error', 'Invalid Username/Password'); return done(null, false); }
        return done(null, user);
      });
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie 
        // and we are just sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;