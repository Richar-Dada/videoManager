'use strict';

const express = require('express');
const router = express.Router();

let videoController = require('../controllers/videoController.js');

router.get('/play/:id',videoController.play);

module.exports = router;