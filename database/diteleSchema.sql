DROP SCHEMA IF EXISTS diteleSchema;
CREATE SCHEMA diteleSchema;
USE diteleSchema;

CREATE TABLE Users(
	userID varchar(20),
	password varchar(20),
	sessionID varchar(20),
	fullname varchar(20),
	emailID varchar(30),
	about varchar(200),
	PRIMARY KEY (userID)
);

CREATE TABLE Class(
	classID int not null auto_increment,
	userID varchar(20),
	classTopic varchar(20),
	subTopic varchar(200),
	dayOfTheWeek int(1),
	classStartTime time,
	classEndTime time,
	noteFromTutor varchar(100),
	PRIMARY KEY (classID),
	FOREIGN KEY (userID) references Users(userID)
);
#drop table Class; 

CREATE TABLE Registration(
	userID varchar(20),
	classID int,
	userType varchar(2),
	FOREIGN KEY (userID) references Users(userID),
	FOREIGN KEY (classID) references Class(classID)
);
#drop table Registration;


