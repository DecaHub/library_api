"use strict";

const promise = require("bluebird");

let options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);

let connect2DB = (dbName) => {
	
	let cn = {
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		user: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: dbName
	};
	
	return pgp(cn);
};

module.exports = {
	connect2DB: connect2DB
};