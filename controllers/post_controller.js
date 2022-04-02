const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = function(req, res){
    // id means converting the objectId to string if _id is put then undefined will be shown.
    Post.findById(req.params.id, function(err, post){
        if(err){console.log("Error in finding the post");return;}
        // post.user._id = undefined req.locals._id is also undefined
        // console.log(post.user.id+" "+post.user.id+" "+req.locals._id);
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){console.log("Error in deleting all the comments "+err);return;}
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
        
    });
}
