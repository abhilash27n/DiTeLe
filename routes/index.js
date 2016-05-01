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
  if(req.session.username){
  	res.render("userMainPage", {name: req.session.fullname});
  }
  else{
  	res.render("index");
  }
  	
});

//Login verification
router.post('/login', function(req, res, next) {
  console.log("Logging in");
  var username = req.body.username;
  var pwd = req.body.pwd;

  var query = 'select userID,fullname from Users where userID = "'+ username + '" and password = "' + pwd + '"';
  
  connection.query(query, function(err, rows, fields){
  	if(!err){
  		if(rows.length > 0){
  			console.log("login successful");
  			req.session.username = username;
  			req.session.fullname = rows[0].fullname;
  			res.render("userMainPage", {name: req.session.fullname});
  		}
  		else{
  			console.log("Invalid username/password");
  			res.render("index", {message: " Invalid UserName/Password. "});	
  		}
  	}
  	else{
  		console.log("DB Error");
  		res.render("index", {message: " Error connecting to DB. "});
  	}

  });

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

//Render Register to Teach
router.post('/registerToTeach', function(req, res, next) {
  if(req.session.username){
  	console.log("Registering to Teach Page");
  	res.render("registerToTeach", {name: req.session.username});
  }
  else{
  	res.render("index");
  }
});


//Register to teach data form submit
router.post('/regTeacher', function(req, res, next) {
  	console.log("Registering to Teach...");
  	var username = req.session.username;
  	var topic = req.body.topic;
  	var subTopic = req.body.subTopic;
  	var weekCheck = req.body.weekday;
  	var note = req.body.note;
  	var startTime = [req.body.monStartTime,req.body.tueStartTime,req.body.wedStartTime,req.body.thuStartTime,req.body.friStartTime,req.body.satStartTime,req.body.sunStartTime];
  	var endTime = [req.body.monEndTime,req.body.tueEndTime,req.body.wedEndTime,req.body.thuEndTime,req.body.friEndTime,req.body.satEndTime,req.body.sunEndTime];
  	var weekDayArray = {"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6};
  	for(var i = 0; i < weekCheck.length; i++){
  		var index = weekDayArray[weekCheck[i]];
  		console.log("Registering for "+weekCheck[i]);
  		var tuple = {userID: username, classTopic: topic, subTopic: subTopic, dayOfTheWeek: index, classStartTime: startTime[index], classEndTime: endTime[index], noteFromTutor: note}
  		connection.query('INSERT INTO Class SET ?', tuple, function(err, response) {
		  if (!err){
			console.log('Registration for class successful');
		  }
		  else{
		  	console.log('Registration error, probably due to data config');
		  }
		    
		});
  	}
  	res.render("userMainPage", {name: req.session.fullname});
});

//get teaching classes
router.get('/getTeachingClass', function(req, res, next) {
  	console.log("Getting Teaching class...");
  	var username = req.session.username;
	var query = 'select classID, classTopic, subTopic, dayOfTheWeek, classStartTime, classEndTime, noteFromTutor from Class where userID = "'+username+'"';
	connection.query(query, function(err, rows, fields) {
	  if (!err){
		res.send(JSON.stringify(rows));
	  }
	  else{
	  	console.log('Error getting what user teaches');
	  }
	    
	});
});



module.exports = router;
