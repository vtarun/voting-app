var PollModel = require('../models/poll.model');
var Vote = require('../models/vote.model');

function getAllPolls(req, res, next){
	PollModel.find({}, function(err, result){
		if(err){
			return res.send("not found");
		}else{
			res.json({result});
		}
	});
};

function getMyPolls(req, res, next){
	//PollModel.find({poll_owner : req.params.owner}, function(err, result){
	PollModel.find({poll_owner : req.username}, function(err, result){
		if(err){
			res.status(401).json("not found");
		}else{			
			res.status(200).json({result});
		}
	});
};

function createPoll(req, res, next){
	let poll_name = req.body.pollName;
	let poll_options = req.body.pollOptions;
    let poll_owner = req.username;		
	PollModel.create({
		poll_name : poll_name,
		poll_options : poll_options,
		poll_owner : poll_owner
	}, function(err, result){
		if(err){
			console.log(err.message);
			res.status(400).send('poll already exits');
		}
		else{			
			res.json({result});
		}
	})
};

function getPoll(req, res, next){
	PollModel.findOne({'_id' : req.params.id}, function(err, result){
		if(err){
			res.send("not found");
		}else{			
			res.json({result});
		}
	});	
};

function castVote(req, res, next){
	PollModel.findOne({'_id' : req.body.id}, function(err, result){
		if(err){
			res.send("not found");
		}else{
			//if(result.poll_owner )
			for(var i = 0; i < result.poll_options.length; i++){
				if(result.poll_options[i]._id == req.body.choosed_option){
					result.poll_options[i].votes += 1;
					break;
				}
			}			
			result.save((err) => {
				if(err) {
					console.log('error');
					res.status(400).send('vote not saved');
				}else{
					Vote.create({
						poll_id : req.body.id,
						poll_username : req.body.user 
					});
					res.json({result});
				}
			})		
		}
	});
};

function removePoll(req, res){	
	PollModel.deleteOne({'_id' : req.params.id}, function(err, result){
		if(err){
			return res.status(400).send('poll not deleted - ',err);
		}else{
			return res.status(200).json({result});
		}
	});
};

module.exports = {
	getAllPolls : getAllPolls,
	getMyPolls : getMyPolls,
	createPoll : createPoll,
	getPoll : getPoll,
	removePoll : removePoll,
	castVote : castVote
};
