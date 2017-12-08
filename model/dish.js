var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var obj = {
	name:String,
	intro:String,
	src:String,
	price:String,
	updateperson:String
}

var model = mongoose.model('dish',new Schema(obj));

module.exports = model ;