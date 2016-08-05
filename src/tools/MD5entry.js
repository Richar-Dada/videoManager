'use strict';

const crypto = require('crypto');

const secret = 'richar';

exports.MD5entry = (normalString)=>{
    const hash = crypto.createHmac('MD5',secret).update(normalString).digest('hex');
    return hash;
};