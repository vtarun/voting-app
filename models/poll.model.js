var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	'poll_name' : {
			type: String , 
			required : true,
			unique: true
			},
	'poll_options' : [{				
				option: {
					type: String,
					required : true
				},
				votes :{
					default : 0,
					type : Number
				}
			}],				
	'poll_owner' :  {
			type: String , 
			require : true
			},
	'createdAt' : {
	        type: Date,
	        default: Date.now()
    		}
});

var Model = mongoose.model('Polls', pollSchema);
module.exports = Model;