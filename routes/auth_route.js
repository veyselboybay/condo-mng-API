const { createUser, loginUser } = require('../controller/auth_controller');

const router = require('express').Router();


router.post('/signup', createUser);
router.post('/login',loginUser)

module.exports = router;