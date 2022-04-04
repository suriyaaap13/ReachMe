const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById( req.body.post );
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        }
    }catch(err){
       req.flash('error', err);
       return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate( postId, {$pull: {comments: req.params.id}} );
            return res.redirect('back');
        }
    }catch(err){
        res.flash('error', 'You are not allowed to delete this comment');
        return res.redirect('back');
    }
}