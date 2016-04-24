var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'diteleuser',
  password : 'password',
  database : 'diteleSchema'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Login verification
router.post('/login', function(req, res, next) {
  res.send("LOGIN PAGE");
});

//RRender Redister Page
router.get('/register', function(req, res, next) {
  res.render("userRegistration");
});

//Check registration
router.post('/regUser', function(req, res, next) {
  console.log("Registering User");

  var fname = req.body.fname;
  var uname = req.body.username;
  var pwd = req.body.pwd;
  var email = req.body.email;
  var about = req.body.about;

  var tuple = {userID: uname, password: pwd, fullname: fname, emailID: email, about:about};

  connection.query('INSERT INTO Users SET ?', tuple, function(err, response) {
	  if (!err){
		console.log('Registration successful.');
		res.render("index", {message: "Registration Successful."});
	  }
	  else{
	  	console.log('Registration error due to data config/repeated entry');
	  	res.render("userRegistration", {fname: fname, email: email, about: about, error: "USER ALREADY EXISTS"})
	  }
	    
	});
});

module.exports = router;
