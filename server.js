var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var polls = require('./routes/polls');
var cors = require('cors');
var morgan = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var connectFlash = require('connect-flash');
var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost:27017/polls';

mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongo connection error '+ err);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api', polls);

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/polls');
  });

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});




// listen to port 
app.listen(port, () => {
	console.log('listening to port '+ port);
})