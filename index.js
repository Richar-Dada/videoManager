/**
 * Created by Administrator on 2016/8/1 0001.
 */

let NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);

if(NODE_ENV == 'dev'){
    require('./src/app.js');
    console.log('dev');
}else if(NODE_ENV == 'dist'){
    require('./dist/app.js');
    console.log('dist');
}