var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
	poll_id : {
		type : String,
		require : true
	},
	poll_username : {
		type : String,
		require : true
	}
});

module.exports = mongoose.model('Vote', voteSchema);