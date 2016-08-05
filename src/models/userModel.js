'use strict';

const mongoose = require('mongoose');
var schema = mongoose.Schema({
    username : String,
    password : String,
    qq : String,
    email : String
});

var model = mongoose.model('user',schema);
