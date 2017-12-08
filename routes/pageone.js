var express = require('express');
var router = express.Router();
var desk = require('../model/desk');

router.post('/',function(req,res){
	desk.create({
		id:req.body.id,
		number:req.body.number,
		dishs:req.body.dishs,
		checked:req.body.checked
	});
});

router.get('/',function(req,res){
	desk.find().then(function(result){
		res.send(`${result.length}`);
	});	
});

router.post('/init',function(req,res){
	if(req.body.page == 0){
		desk.find({}).then(function(result){
			if(result.length){
				res.send(`${JSON.stringify(result)}`);
			}else{
				res.send('0');
			}		
		});
	}else{
		var skip = (req.body.page-1)*44;
		desk.find({},{},{limit:44,skip:skip}).then(function(result){
			if(result.length){
				res.send(`${JSON.stringify(result)}`);
			}else{
				res.send('0');
			}		
		});
	}
});

router.get('/getdesk',function(req,res){
	desk.find({
		id:req.query.num
	}).then(function(result){
		res.cookie('deskid',result[0].id);
		res.send('success');
	});
});

router.get('/delect',function(req,res){
	desk.find({
		id:req.query.num
	}).then(function(result){
		desk.findByIdAndRemove(result[0]._id).then(function(){
			res.send('success');
		});
	});
});

module.exports = router ;