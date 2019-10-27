const express = require('express');
const { getPosts, createPost } = require('../contorollers/post');
const { requireSignin } = require('../contorollers/auth');
const validator = require('../validators');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', validator.createPostValidators, createPost);

module.exports = router;