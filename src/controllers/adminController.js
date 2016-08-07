'use strict';
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('formidable');
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
	let form = new formidable.IncomingForm();
    //通过fomidable中间件获取上传的文件
	form.uploadDir = path.join(__dirname,"../static/upload");
	form.keepExtensions = true;

	//文件上传，文件不能播放，需要把文件设成不能播放
	model.update({id:req.body.id},{__v:0},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
	});

    form.parse(req, function(err, fields, files) {
		if(err){
			console.log(err);
			res.end('文件上传失败');
			return;
		}
        //不是mp4文件，使用ffmpeg进行转码
        if(files.mp4file.type != 'video/mp4'){
            let soucePath = files.mp4file.path;
            let destPath = files.mp4file.path + '.mp4';
            let ffmpeg = require('fluent-ffmpeg');
            ffmpeg(soucePath)
                .size('60%')
                .on('error', function(err) {
                    console.log('An error occurred: ' + err.message);
					res.end(err.toString());
					return;
                })
                .on('end', function() {
                    console.log('Processing finished !');
					//记录视频文件的id，用来更新数据库信息
					let where = {_id :fields.id};
					//把视频文件路径名更新到数据库中
					model.update(where,{__v:1,filepath:path.basename(destPath)},(err)=>{
						if(err){
							console.log(err);
							res.end(res);
							return;
						}
						res.end('<script>alert("视频上传成功");window.location = "/admin/list"</script>');
					});
					//把源文件删除
					let fs = require('fs');
					fs.unlink(soucePath,(err)=>{
						console.log('移除了源文件');
					});
                })
                .save(destPath);
		}else{
            //记录视频文件的id，用来更新数据库信息
            let where = {_id :fields.id};
            //把视频文件路径名更新到数据库中
            model.update(where,{__v:1,filepath:path.basename(files.mp4file.path)},(err)=>{
                if(err){
                    console.log(err);
                    res.end(res);
                    return;
                }
                res.end('<script>alert("视频上传成功");window.location = "/admin/list"</script>');
            });
        }


    });
};