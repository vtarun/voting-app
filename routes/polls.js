var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var PollModel = require('../models/poll-model');
var pollModel = new PollModel();


route.get('/all-polls' , function(req, res){
	PollModel.find({}, function(err, result){
		if(err){
			return res.send("not found");
		}else{
			res.json({result});
		}
	});
});

route.get('/mypolls/:owner' , function(req, res){
	PollModel.find({'poll_owner' : req.params.owner}, function(err, result){
		if(err){
			return res.send("not found");
		}else{			
			res.json({result});
		}
	});
});

route.post('/newpoll' , function(req, res){
	console.log(req.body)
	
	pollModel.poll_name = req.body.pollName;
	pollModel.poll_options = req.body.pollOptions;
    pollModel.poll_owner = req.body.pollOwner;		
	
	pollModel.save(function(err, result){
		if(err){
			console.log(err);
			res.status(500).send('poll already exits');
		}
		else{			
			res.json({result});
		}
	})
});
route.get('/poll/:id', function(req, res){
	PollModel.findOne({'_id' : req.params.id}, function(err, result){
		if(err){
			res.send("not found");
		}else{			
			res.json({result});
		}
	});	
});
route.post('/vote', function(req, res){
	PollModel.findOne({'_id' : req.body.id}, function(err, result){
		if(err){
			res.send("not found");
		}else{
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
					res.json({result});
				}
			})		
		}
	});
});

route.delete('/mypolls/delete/:id', function(req, res){	
	PollModel.deleteOne({'_id' : req.params.id}, function(err, result){
		if(err){
			return res.status(400).send('poll not deleted - ',err);
		}else{
			return res.status(200).json({result});
		}
	});
});

module.exports = route;






















