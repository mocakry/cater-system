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
	if(req.query.status == 1){
		res.render('dishdeatil',{title:'菜单',show:true});
	}else{
		res.render('dishdeatil',{title:'菜单',show:false});
	}	
});

router.post('/',function(req,res){
	dish.find({
		_id:req.cookies.dishid
	}).then(function(result){
		var data = JSON.stringify(result);
		res.send(`${data}`);
	});
});

router.post('/change',upload.single('picture'),function(req,res){
	if(req.file){
		var src = `/picture/${req.file.filename}`;
		dish.findByIdAndUpdate(req.cookies.dishid,{$set:{name:req.body.dishname,price:req.body.dishprice,intro:req.body.dishdescribe,src:src}}).then(function(){
			res.redirect('/');
		});
	}else{
		dish.find({
			_id:req.cookies.dishid
		}).then(function(result){
			var src = result[0].src;
			console.log(src);
			dish.findByIdAndUpdate(req.cookies.dishid,{$set:{name:req.body.dishname,price:req.body.dishprice,intro:req.body.dishdescribe,src:src}}).then(function(){
				res.redirect('/');
			});
		});
	}
});

module.exports = router ;

