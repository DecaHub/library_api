"use strict";

require('dotenv').config();
const express = require('express');
const app = express();

const mysql = require('mysql');
const connection =  mysql.createConnection({
	// host: process.env.MYSQL_HOST,
	// port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

console.log(">> etete", process.env.NODE_ENV);

connection.connect((err) => {
	if (err) {
		console.log(`Error connecting: ${err}`);
		return;
	}
	
	console.log(`Connected as id ${connection.threadId}`);
});

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.listen(8000, () => {
	console.log(`Listening on port 8000!`);
});