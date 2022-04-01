const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: {
        type: 'String', 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = new mongoose.model('Post', postSchema);
module.exports = Post;