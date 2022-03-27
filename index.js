const express = require('express');
const app = express();
const port = 8000;

// use express router
app.get('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }else{
        console.log(`Server is up and running in port ${port}`);
    }
});