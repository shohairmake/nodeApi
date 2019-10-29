const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../contorollers/user');
const { requireSignin } = require('../contorollers/auth');

const router = express.Router();


router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);
router.param('userId', userById);

module.exports = router;