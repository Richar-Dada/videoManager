'use strict';

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    name : String,
    scope : String,
    keyword : String,
    content : String,
    filepath : String
});

let model = mongoose.model('video',schema);
