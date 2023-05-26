const { createUser } = require('../controller/auth_controller');

const router = require('express').Router();


router.post('/signup', createUser);

module.exports = router;