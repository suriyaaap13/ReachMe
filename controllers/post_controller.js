const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    
    try{
        let post = await Post.create({content: req.body.content, user: req.user._id});
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }
        req.flash('success', 'Post created');
    }catch(err){
        req.flash('error', err);
    }
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    // id means converting the objectId to string if _id is put then undefined will be shown.
    let post = await Post.findById(req.params.id);
    // post.user._id = undefined req.locals._id is also undefined
    // console.log(post.user.id+" "+post.user.id+" "+req.locals._id);
    try{
        if(post.user == req.user.id){
            await post.remove();
            Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success', 'Post and associated comments are deleted!!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}