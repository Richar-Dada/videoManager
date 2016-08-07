'use strict';
const path = require('path');
const mongoose = require('mongoose');
let model = mongoose.model('video');

//响应/admin/list
exports.listGet = (req,res)=>{
    //获取所有的视频，显示出来
    model.find({},(err,data)=>{
        if(err){
            console.log(err);
            res.end(err);
            return;
        }
        res.render(path.join(__dirname,'../views/index.html'),{title:'首页',data:data},(err,content)=>{
            if(err){
                console.log(err);
                res.end(err);
                return;
            }
            res.end(content);
        });
    });
};

exports.search = (req,res)=>{
    //获取搜索关键值
    let searchString = req.body.vname;

    //向数据查找数据
    //定义一个正则表达式，因为mongodb模糊查找需要输入正则
    let reg = new RegExp(searchString,'i');
    model.find({name:reg},(err,data)=>{
        res.render(path.join(__dirname,'../views/index.html'),{title:'首页',data:data,vname:searchString},(err,content)=>{
            if(err){
                console.log(err);
                res.end(err);
                return;
            }
            res.end(content);
        });
    });
};

//响应/admin/add
exports.addGet = (req,res)=>{
    res.render(path.join(__dirname,'../views/add.html'),{title:'添加视频'},(err,content)=>{
        if(err){
            console.log(err);
            res.end(err);
            return ;
        }
        res.end(content);
    });
};

exports.addPost = (req,res)=>{
    //获取新增视频的信息
    let name = req.body.name;
    let scope = req.body.scope;
    let keyword = req.body.keyword;
    let content = req.body.editorValue;

    //把数据插入到数据中
    model.create({
        name : name,
        scope : scope,
        keyword : keyword,
        content : content,
        filepath : ''
    },(err)=>{
        if(err){
            console.log(err);
            res.end(err);
            return ;
        }
        res.end('<script>alert("新增视频成功");window.location = window.location</script>');
    });
};

//响应/admin/del/:id
exports.del = (req,res)=>{
    let id = req.params.id;
    //查找到相应的数据，删除之
    model.remove({_id:id},(err)=>{
        if(err){
            console.log(err);
            res.end(err);
            return;
        }
        res.end('<script>alert("视频删除成功");window.location="/admin/list"</script>');
    });
};

//响应/admin/edit
exports.editGet = (req,res)=>{
	//获取需要修改视频的id
	let id = req.params.id;

	//查询到需要编辑的视频信息，填入对应的输入框
	model.find({_id:id},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/edit.html'),{title:'修改视频',data:data[0]},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	});
};

exports.editPost = (req,res)=>{
  //获取传过来的数据，存到数据库中
    //获取新增视频的信息
    let name = req.body.name;
    let scope = req.body.scope;
    let keyword = req.body.keyword;
    let content = req.body.editorValue;

    //把数据插入到数据中
    model.update({
        name : name,
        scope : scope,
        keyword : keyword,
        content : content,
    },(err)=>{
        if(err){
            console.log(err);
            res.end(err);
            return ;
        }
        res.end('<script>alert("视频修改成功");window.location = "/admin/list"</script>');
    });
};

//响应/admin/upload
exports.upload = (req,res)=>{

    //通过fomidable中间件获取上传的文件
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
};