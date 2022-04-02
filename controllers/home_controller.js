const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = (req,res)=>{
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){console.log("Error in finding the post");return;}
        User.find({}, function(err, users){
            return res.render('home', {
                title: "home",
                post: posts,
                all_users: users
            });
        });
        
    });
}