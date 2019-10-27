const express = require('express');
const { signup, signin } = require('../contorollers/auth');
const { userSignupValidator } = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;