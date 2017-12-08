var express = require('express');
var router = express.Router();
var desk = require('../model/desk');

router.get('/',function(req,res){
	var name = 'nickname';
	try{
		name = req.session.info['nickname'];
	}catch(e){
		name = 'nickname';
	}
	res.render('deskdeail',{title:'餐桌客户详情',name:name}); 
});

router.get('/check',function(req,res){
	res.render('check',{title:'点菜单'});
})

router.post('/',function(req,res){
	desk.find({
		id:req.cookies.deskid
	}).then(function(result){
		res.send(result[0]);
	});
});

router.post('/update',function(req,res){
	desk.find({
		id:req.cookies.deskid
	}).then(function(result){
		desk.findByIdAndUpdate(result[0]._id,{$set:{dishs:req.body.dishs}}).then(function(){
			res.send('success');
		});
	});
});

router.post('/submitinfo',function(req,res){
	desk.find({
		id:req.cookies.deskid
	}).then(function(result){
		if(req.body.status == 1){
			desk.findByIdAndUpdate(result[0]._id,{$set:{number:req.body.number,checked:1}}).then(function(){
				res.send('success');
			});	
		}
		if(req.body.status == 2){
			desk.findByIdAndUpdate(result[0]._id,{$set:{checked:0,dishs:0,number:0}}).then(function(){
				res.send('success');
			});	
		}
	});
});

module.exports = router ; 