const User = require('../models/user');
const Post = require('../models/post');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "Profile Page",
            profile_user: user
        });
    });
}

// render the login page
module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('login', {
        title: "Login"
    });
}

// render the register page
module.exports.register = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('register', {
        title: "Register"
    });
}

// get the registeration data
module.exports.create = async function(req, res){
    if(req.body.password!=req.body.confirm_password){
        res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            res.redirect('login');
        }
    }catch(err){
        console.log("Error in creating the user", err);
        return;
    }
    

}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

module.exports.update = function(req, res){
    if(res.locals.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err){
            if(err){console.log("Error in finding and updating the user "+err);return;}
            res.redirect('back');
        });
    }else{
        res.redirect('back');
    }
}
