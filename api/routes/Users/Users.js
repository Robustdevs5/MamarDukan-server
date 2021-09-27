const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const usersControllers = require('../../controllers/User');


// ************************* Handle signup user router **************************
router.post('/signup', usersControllers.signUp_user);


// ************************* Handle Login user router **************************
router.post('/login', usersControllers.login_user);
router.delete('/:userId', checkAuth, usersControllers.login_user_deleted);



module.exports = router;