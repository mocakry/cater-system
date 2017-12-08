var express = require('express');
var router = express.Router();
var user = require('../model/user');
var md5 = require('md5');

router.get('/',function(req,res){
	res.render('login',{title:'登录页面'});
});

router.post('/',function(req,res){
	user.find({
		email:req.body.email,
		password:md5(req.body.password)
	}).then(function(result){
		if(result.length){
			req.session.info = result[0];
			res.redirect('/');
		}else{
			res.render('login',{title:'登录页面'});
		}
	});
});

module.exports = router ; 