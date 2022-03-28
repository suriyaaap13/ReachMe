const User = require('../models/user');
module.exports.profile = function(req, res){
    return res.render('home', {
        title: "Profile Page"
    });
}

// render the login page
module.exports.login = function(req,res){
    return res.render('login', {
        title: "Login"
    });
}

// render the register page
module.exports.register = function(req,res){
    return res.render('register', {
        title: "Register"
    });
}

// get the registeration data
module.exports.create = function(req, res){
    if(req.body.password!=req.body.confirm_password){
        res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err)if(err){console.log("Error in finding the user "+err);}
        if(!user){
            User.create(req.body, function(err){
                if(err){console.log("Error in creating user "+err);}
            });
            res.redirect('login');
        }else{
            res.redirect('back');
        }
    });

}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    


}