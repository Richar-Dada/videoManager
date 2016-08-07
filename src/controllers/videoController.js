'use strict';

const mongoose = require('mongoose');
const path = require('path');

let model = mongoose.model('video');

//��Ӧ/play/id
exports.play = (req,res)=>{
    let id = req.params.id;
    //����id�ҵ���Ӧ����Ƶ����Ⱦ��ҳ����
    model.find({_id:id},(err,data)=>{
        if(err){
            console.log(err);
            res.end(err);
            return;
        }
        console.log(data)
        res.render(path.join(__dirname,'../views/play.html'),data[0],(err,content)=>{
            if(err){
                console.log(err);
                res.end(err);
                return;
            }
            res.end(content);
        })
    });
};