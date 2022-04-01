const { is } = require('express/lib/request');
const Post = require('../models/post');
module.exports.home = (req,res)=>{

    if(req.isAuthenticated()){
        
        Post.find({}).populate('user').exec(function(err, posts){
            if(err){console.log("Error in finding the post");return;}
            return res.render('home', {
                title: "home",
                post: posts
            });
        });

    }else{
        return res.render('home', {
            title: "home"
        });
    }
    
}