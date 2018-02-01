var express = require('express');
var router = express.Router();
var pollCtrl = require('../controllers/poll.controller');
var userCtrl = require('../controllers/user.controller');


router
	.route('/login')
	.post(userCtrl.login);

router
	.route('/register')
	.post(userCtrl.register);	

router
	.route('/all-polls')
	.get(pollCtrl.getAllPolls);

router
	.route('/mypolls')
	.get(userCtrl.authenticate, pollCtrl.getMyPolls);

router
	.route('/newpoll')
	.post(userCtrl.authenticate, pollCtrl.createPoll);

router
	.route('/poll/:id')
	.get(pollCtrl.getPoll);

router
	.route('/vote')
	.post(userCtrl.validatePastVotes, pollCtrl.castVote);

router
	.route('/mypolls/delete/:id')
	.delete(userCtrl.authenticate, pollCtrl.removePoll);

module.exports = router;