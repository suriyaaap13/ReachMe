const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async (req,res)=>{

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
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
        res.flash('error', err);
        return res.redirect('back');
    }
}