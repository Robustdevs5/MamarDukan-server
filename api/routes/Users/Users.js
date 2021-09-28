const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const usersControllers = require('../../controllers/User');


// ************************* Handle user router **************************
router.post('/signup', usersControllers.signUp_user);
router.post('/login', usersControllers.login_user);
router.get('/', usersControllers.all_user);
router.get('/:userId', usersControllers.single_user);
router.patch('/:userId', usersControllers.updated_user);
router.delete('/:userId', usersControllers.login_user_deleted);



module.exports = router;