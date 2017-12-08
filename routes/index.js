var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	  if(req.session.info){
	  	  res.render('index', { title: '主页' ,name: req.session.info['nickname']});
	  }else{
	  	res.redirect('/register');
	  }
});

router.get('/logout',function(req,res){
	req.session.destroy(function(){
		res.redirect('/register');
	});
});

module.exports = router;
