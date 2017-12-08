var express = require('express');
var router = express.Router();
var dish = require('../model/dish');

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/picture");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage });

router.get('/',function(req,res){
	var name = 'nickname';
	try{
		name = req.session.info['nickname'];
	}catch(e){
		name = 'nickname';
	}
	res.render('updatedishs',{title:'上传菜品',name:name});
	console.log(name);
});

router.post('/',upload.single('picture'),function(req,res){
	if(req.file){
		dish.create({
			name:req.body.dishname,
			price:req.body.dishprice,
			intro:req.body.dishdescribe,
			src:`/picture/${req.file.filename}`,
			updateperson:req.session.info['nickname'],
		}).then(function(){
			console.log('success');
			res.redirect('/');
		});
	}else{
		dish.create({
			name:req.body.dishname,
			price:req.body.dishprice,
			intro:req.body.dishdescribe,
			src:'/images/bg.jpg',
			updateperson:req.session.info['nickname'],
		}).then(function(){
			console.log('success');
			res.redirect('/');
		});
	}	
});

router.post('/getdishs',function(req,res){
	dish.find().then(function(result){
		if(result.length){
			result = JSON.stringify(result);
			res.send(`${result}`);
		}else{
			res.send('0');
		}
	});
});

router.post('/getself',function(req,res){
	dish.find({
		updateperson:req.body.name
	}).then(function(result){
		if(result.length){
			result = JSON.stringify(result);
			res.send(`${result}`);
		}else{
			res.send('0');
		}
	});
});

router.get('/name',function(req,res){
	res.send(`${req.session.info['nickname']}`);
});

router.get('/control',function(req,res){
	if(req.query.num == 1){
		dish.findByIdAndRemove(req.query.id).then(function(){
		res.send('success');
		});
	}else if(req.query.num == 2){
		res.cookie('dishid',req.query.id);
		res.send('success');
	}
});

router.post('/status',function(req,res){
	if(req.body.status == 1){
		res.cookie('status',req.body.num);
		res.send('success');
	}else{
		res.send(req.cookies.status);
	}
	
});

module.exports = router ;