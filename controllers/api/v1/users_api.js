const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        console.log(req.body);
        let user = await User.findOne({email: req.body.email});
        if(!user||user.password!=req.body.password){return res.json(422, {message: 'Invalid Username/Password'});}
        res.json(200, {
            message: 'Log In successful, here is your token, please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'secret', { expiresIn: '1h' })
            }
        });

    }catch(err){
        console.log("Error", err);
        res.json(500, {
            message: 'Unauthorized'
        })
    }
}