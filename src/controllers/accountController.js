//获取user表，用来进行数据操作
const mongoose = require('mongoose');
var model = mongoose.model('user');

exports.loginGet = (req,res)=>{
    res.render('login.html',(err,content)=>{
       if(err){
           console.log(err);
           res.end(err);
           return;
       }
        res.end(content);
    });
};

exports.loginPost = (req,res)=>{
    //获取用户名和密码
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var vcode = req.body.vcode;

    //将密码进行MD5加密
    upwd = require('../tools/MD5entry.js').MD5entry(upwd);

    //判断验证码输入是否正确，正确就查询数据库，不正确就从新登陆
    if(vcode == req.session.vcode){
        //向数据库查询，判断返回值，如果返回值长度等于0，那么就是登陆错误，如果不等于1就是登陆成功
        var where = {username:uname,password:upwd};
        model.find(where,(err,data)=>{
            if(err){
                console.log(err);
                res.end(err);
                return;
            }

            if(data.length == 0){
                res.end('<script>alert("登陆失败");window.location = window.location</script>')
            }else{
                req.session.uname = uname;
                res.end('<script>alert("登陆成功");window.location = "/admin/list"</script>');
            }

        });
    }else{
        res.end('<script>alert("验证码输入不正确");window.location = window.location</script>');
    }



};

exports.registerGet = (req,res)=>{
    res.render('register.html',(err,content)=>{
        if(err){
            console.log(err);
            res.end(err);
            return;
        }
        //把页面内容响应回浏览器
        res.end(content);

    });

};

exports.registerPost = (req,res)=>{
    //获取用户信息
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var uqq = req.body.uqq;
    var uemail = req.body.uemail;

    //将密码进行MD5加密
    upwd = require('../tools/MD5entry.js').MD5entry(upwd);
    console.log(upwd);

    //把数据插入数据库
    model.create({
        username : uname,
        password : upwd,
        qq : uqq,
        email : uemail
    },(err)=>{
        if(err){
            console.log(err);
            res.end(err);
            return;
        }

        res.end('<script>alert("注册成功");window.location ="/account/login";</script>');
    });
};

//响应验证码url，返回验证码图片
exports.getVcode = (req,res)=>{
    let sourceString = '1234567890';
    let stringLength = 4;
    let vcode = '';
    for(let i=0;i<stringLength;i++){
        let ranNumber = parseInt((Math.random() * 1000) % 10);
        vcode = vcode + sourceString[ranNumber];
    }
    //把验证码保存到session中
    req.session.vcode = vcode;

    //利用captchapng生成验证码图片
    const captchapng = require('captchapng');

    var p = new captchapng(80,30,parseInt(vcode)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);


};