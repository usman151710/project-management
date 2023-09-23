const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();


//login route
router.post('/login', loginUser);

//signup
router.post('/register', signupUser)

module.exports = router;