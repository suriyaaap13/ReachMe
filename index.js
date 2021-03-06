require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./assets'));
// set up the uploads for the browser to use
app.use('/uploads', express.static(__dirname+'/uploads'));

// set up the view engine
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set('view engine', 'ejs');
app.set('views', './views');


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

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

const port = 3000;
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is up and running in port ${port}`);
});