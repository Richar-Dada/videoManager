'use strict';

const express = require('express');
const router = express.Router();

//引入accountController，处理来自account的不同情况
var accountController = require('../controllers/accountController.js');

//路由匹配各种不同的情况
router.get('/login',accountController.loginGet);
router.post('/login',accountController.loginPost);

router.get('/register',accountController.registerGet);
router.post('/register',accountController.registerPost);

router.get('/getVcode',accountController.getVcode);

module.exports = router;
