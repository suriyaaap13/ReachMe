const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async (req,res)=>{

    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render('home', {
            title: "home",
            post: posts,
            all_users: users
        });
    }catch(err){
        console.log("Error: ", err);
        return;
    }
}