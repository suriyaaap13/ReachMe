const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(session({
    name: 'ReachMe',
    // Change before deployment
    secret: 'blah blah blah', 
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*24*365
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

const port = 3000;
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is up and running in port ${port}`);
});