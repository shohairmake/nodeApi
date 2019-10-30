const express = require('express');
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost } = require('../contorollers/post');
const { requireSignin } = require('../contorollers/auth');
const { userById } = require('../contorollers/user');
const { createPostValidators } = require('../validators');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidators);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.param('userId', userById);
router.param('postId', postById);

module.exports = router;