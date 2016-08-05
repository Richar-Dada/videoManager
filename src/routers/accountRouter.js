'use strict';

const express = require('express');
const router = express.Router();

//����accountController����������account�Ĳ�ͬ���
var accountController = require('../controllers/accountController.js');

//·��ƥ����ֲ�ͬ�����
router.get('/login',accountController.loginGet);
router.post('/login',accountController.loginPost);

router.get('/register',accountController.registerGet);
router.post('/register',accountController.registerPost);

router.get('/getVcode',accountController.getVcode);

module.exports = router;
