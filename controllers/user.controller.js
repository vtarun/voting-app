var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.model');
var Vote = require('../models/vote.model');


module.exports.register = function (req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	if(!username || !password){
		return res.status(400).json({msg : 'Idiot! pass username and password'});
	}

	User.create({
		username : username,
		password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}, function(err, user){
		if(err){
			return res.status(400).json(err);
		}
		return res.status(200).json(user);
	});
};

module.exports.login = function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	if(!username || !password){
		return res.status(400).json({msg : 'Idiot! pass username and password'});
	}
	User.findOne({username : username}).exec(function(err, user){
		if(err){
			return res.status(400).json(err); 
		}else{
			if(!user){
				return res.status(400).json('User does not exist!!'); 
			}else{
				if(bcrypt.compareSync(password, user.password)){
					let token = jwt.sign({username : user.username}, 'secret_key');
					res.status(200).json({token : token});
				}else{
					res.status(401).json('Unauthorize');
				}
			}			
		}
	});
};

module.exports.authenticate = function (req, res, next){
	var headerExists = req.headers.authorization;
	if(headerExists){
		let token = headerExists.split(' ')[1];
		jwt.verify(token, 'secret_key', function(err, decoded){
			if(err){
				 return res.status(401).json('Unauthorize');
			}else{
				req.username = decoded.username;					
				next();
			}
		});		
	}else{
		res.status(403).json('no token provided!!');
	}	
};

module.exports.validatePastVotes = function(req, res, next){
	
	if(req.body.user){
		var ip = req.headers['x-forwarded-for'] || 
			req.connection.remoteAddress || 
			req.socket.remoteAddress || 
			req.connection.socket.remoteAddress;
			req.body.user = ip;
	}
	Vote.findOne({poll_id : req.body.id , poll_username : req.body.user }, function(err, result){
		if(err){
			console.log('err')
			res.status(400).json(err);
		}else{
			console.log(result);
			if(!result){
				return next();
			}else{
				res.status(403).json('you already casted vote!!');
			}
		}
	})
};




