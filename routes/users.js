const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/create', usersController.create);
// router.post('/create-session', usersController.createSession);

module.exports = router;