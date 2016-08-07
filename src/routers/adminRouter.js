'use strict';

const express = require('express');
const router = express.Router();

//引入accountController，处理来自account的不同情况
var adminController = require('../controllers/adminController.js');

//路由匹配各种不同的情况
router.get('/list',adminController.listGet);
router.post('/list',adminController.search);
router.get('/add',adminController.addGet);
router.post('/add',adminController.addPost);
router.get('/del/:id',adminController.del);
router.get('/edit/:id',adminController.editGet);
router.post('/edit',adminController.editPost);
router.post('/upload',adminController.upload);

module.exports = router;
