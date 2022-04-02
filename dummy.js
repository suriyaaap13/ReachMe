const express = require('express');
const env = require('./config/environment');
// morgan for storing errors in files
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
require('./config/view-helpers')(app);

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// express-session(library) is used to put encrypted user id into session-cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const { use } = require('./routes');
const path = require('path');


console.log(env.name);
if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),   //path of scss files
        dest: path.join(__dirname,env.asset_path,'css'),     //path where css files should be stored
        debug: true,    // erros should be shown
        outputStyle: 'extended',   //to show in multiple lines and not compressed
        prefix: '/css' //prefix for where should my server look for css files
    }));
}
app.use(express.urlencoded()); // to use req.body

app.use(cookieParser());

app.use(express.static(env.asset_path));

//uploads-> users->avatars?
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash()); //flash uses session cookies , therefore used after it
app.use(customMware.setFlash);
//doubt: how and when is this setFlash used in sequence

// use express router

app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});