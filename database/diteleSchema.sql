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
	classID varchar(20),
	userID varchar(20),
	classTopic varchar(20),
	subTopic varchar(20),
	weekDay varchar(20),
	classTime time,
	noteFromTutor varchar(100),
	PRIMARY KEY (classID),
	FOREIGN KEY (userID) references Users(userID)
);

CREATE TABLE Registration(
	userID varchar(20),
	classID varchar(20),
	userType varchar(20),
	FOREIGN KEY (userID) references Users(userID),
	FOREIGN KEY (classID) references Class(classID)
);
