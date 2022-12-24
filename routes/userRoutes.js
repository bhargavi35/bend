const express = require('express');
const { createUserController, loginUserController, getUserController } = require('../controller/userController');
const userAuth = require('../middleware/userAuth');
const router = express.Router();

router.post('/signup',createUserController)
router.post('/login',loginUserController)
router.get('/u/getUser',userAuth,getUserController)

module.exports = router;