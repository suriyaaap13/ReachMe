const User = require('../../../models/user');
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async (req, res)=>{
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.json(200, {
            data: {
                post: posts,
                user: "Me Suriyaa"
            }
        });
    }catch(err){
        console.log(err);
        return;
    }
    
}
module.exports.destroy = async function(req, res){
    let post = await Post.findById(req.params.id);
    try{
        if(post.user == req.user.id){
            await post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: 'Post and associated comments are deleted.'
            });
        }else{
            return res.json(401, {
                message: "Unauthorized!! You cannot delete this post"
            })
        }
    }catch(err){
        console.log("Hey error due ");
        console.log('*****', err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }
    
}