const User = require('../models/user');
const Post = require('../models/post');
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }
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
        req.flash('error','Password and confirm password doesnot match');
        res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            req.flash('success', 'User Registration Successful');
            await User.create(req.body);
            res.redirect('login');
        }else{
            req.flash('error', 'User exits try logging In');
            return res.redirect('login');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    return res.redirect('/users/login');
}

module.exports.update = function(req, res){
    if(res.locals.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err){
            if(err){console.log("Error in finding and updating the user "+err);return;}
            res.redirect('back');
        });
    }else{
        res.flash('error', "You are not allowed to update");
        res.redirect('back');
    }
}
