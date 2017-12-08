var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var obj = {
	id:String,
	number:String,
	dishs:String,
	checked:String
}

var model = mongoose.model('desk',new Schema(obj));

module.exports = model ;