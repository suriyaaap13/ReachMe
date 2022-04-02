const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local', 
    { failureRedirect: '/users/login' }
),usersController.createSession);
router.get('/logout', usersController.destroySession);


module.exports = router;