const express = require('express');
const { getPosts, createPost } = require('../contorollers/post');
const validator = require('../validators');

const router = express.Router();

router.get('/', getPosts);
router.post('/post', validator.createPostValidators, createPost);

module.exports = router;