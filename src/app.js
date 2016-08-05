
//作用是开启web服务器

'use strict';

// 这是从环境变量中去获取一个PORT的变量值，如果没有则默认给6000端口
let PORT = process.env.PORT || 7777;
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();

//数据库连接
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video');

//调用body-parse中间间，用来处理post请求的数据
app.use(bodyParser());

//设置模板引擎
const xtpl = require('xtpl');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',xtpl.renderFile);

//使用第三方express-session控制登录信息
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'richar', //加密的秘钥
    resave: false,  //将来的扩展参数，现在默认设置为false即可
    saveUninitialized: true
}));

//配置静态资源中间件
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname,'public')));

//调用路由前，要先引入数据目录，这样路由的controllers才能操作数据
require('./models/userModel.js');
require('./models/adminModel.js');

//account路由，处理来自account的页面
var accountRouter = require('./routers/accountRouter.js');
app.use('/account',accountRouter);

//admin是管理员才能访问的，当访问admin页面时应该作权限判断
//如果他有登录才能去admin页面
app.all('/admin/*',(req,res,next)=>{
    //if(req.session.uname){
        next();
    //}
    //res.end('<script>alert("请先登录");window.location = "/account/login"</script>');
});

//admin路由器，处理来自admin的页面
var adminRouter = require('./routers/adminRouter.js');
app.use('/admin',adminRouter);

//ueditor文本编辑器的路由
const ueditor = require('ueditor');
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {
		var foo = req.ueditor;

		var imgname = req.ueditor.filename;

		var img_url = '/images/ueditor/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
		res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
	}
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = '/images/ueditor/';
		res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {
		// console.log('config.json')
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/ueditor/nodejs/config.json');
	}
}));


app.listen(PORT,()=>{

    console.log('环境启动'+ PORT);
});

