var express = require("express");
var router = express.Router();
var user = require('../model/user');
var md5 = require('md5');

router.get("/",function(req,res){
	res.render("register",{title:"注册页面"});
});

router.post('/',function(req,res){
	user.create({
		nickname:req.body.nickname,
		email:req.body.email,
		password:md5(req.body.password)
	});
});

router.post('/nickname',function(req,res){
	user.find({
		nickname:req.body.nickname
	}).then(function(result){
		if(result.length){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});

router.post('/email',function(req,res){
	user.find({
		email:req.body.email
	}).then(function(result){
		if(result.length){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});

module.exports = router;