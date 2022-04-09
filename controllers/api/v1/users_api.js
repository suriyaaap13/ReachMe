require('dotenv').config();
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user||user.password!=req.body.password){return res.json(422, {message: 'Invalid Username/Password'});}
        res.json(200, {
            message: 'Log In successful, here is your token, please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), process.env.SECRET , { expiresIn: '1h' })
            }
        });

    }catch(err){
        console.log("Error", err);
        res.json(500, {
            message: 'Unauthorized'
        })
    }
}