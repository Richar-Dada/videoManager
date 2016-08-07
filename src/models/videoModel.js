'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name : String,
    scope : String,
    key : String,
    content : String,
    filepath : String
});

let model = mongoose.model('videoInfo',schema);
