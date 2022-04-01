const { is } = require('express/lib/request');
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
        return res.render('home', {
            title: "home",
            post: posts
        });
    });
}