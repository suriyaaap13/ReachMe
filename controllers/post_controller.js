const Post = require('../models/post');

module.exports.create = function(req, res){
    console.log(req.body.content);
    console.log(req.user._id);
    if(req.isAuthenticated()){
        Post.create({content: req.body.content, user: req.user._id}, function(err, post){
            console.log(post);
            if(err){
                console.log("Error in creating a post "+ err);
                return;
            }
            return res.redirect('back');
        });
    }
}