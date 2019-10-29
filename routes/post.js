const express = require('express');
const { getPosts, createPost } = require('../contorollers/post');
const { requireSignin } = require('../contorollers/auth');
const { userById } = require('../contorollers/user');
const validator = require('../validators');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', requireSignin, validator.createPostValidators, createPost);
router.param('userId', userById);

module.exports = router;