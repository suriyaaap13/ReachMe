const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');


const app = express();
app.use(cookieParser());
app.use(urlencoded());
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

// use express router
app.use('/', require('./routes'));

const port = 8000;
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is up and running in port ${port}`);
});