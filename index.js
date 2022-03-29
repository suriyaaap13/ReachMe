const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// used for session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sassMiddleware = require('node-sass-middleware');

const app = express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

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
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/reachMe_development',
        autoRemove: 'disabled'
    },function(err){
        if(err){console.log(err);}
    })
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