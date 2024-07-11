CREATE DATABASE gh5;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username TEXT NOT NULL, 
    password TEXT NOT NULL,
    age INT NOT NULL,
    gender ENUM("male","female") NOT NULL,
    role ENUM("user","admin","recruiter") NOT NULL,
    point INT
);

CREATE TABLE course(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
	url TEXT NOT NULL,
    description TEXT NOT NULL,
    point INT NOT NULL
);

CREATE TABLE course_history(
	userId INT NOT NULL,
    courseId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (courseId) REFERENCES course(id)
);