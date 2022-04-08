const User = require('../../../models/user');
const Post = require('../../../models/post');
module.exports.index = async (req, res)=>{
    try{
        let posts = await Post.find({});
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