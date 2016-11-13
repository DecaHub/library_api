"use strict";

let promise = require("bluebird");

let options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

let cn = {
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE
};

let db = pgp(cn);

let getAllAssets = (req, res, next) => {
	db.any(`SELECT * FROM assets`)
		.then((data) => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved ALL assets'
				});
		})
		.catch((err) => {
			return next(err);
		})
};

let getSingleAsset = (req, res, next) => {
	let assetID = parseInt(req.params.id);
	db.one(`SELECT * FROM assets WHERE id = ${assetID}`)
		.then((data) => {
			res.status(200)
				.json({
					status: "success",
					data: data,
					message: "Retrived ONE asset"
				})
		})
		.catch((error) => {
			return next(error);
		})
};

let createAsset = (req, res, next) => {
	console.log(req);
};

module.exports = {
	getAllAssets: getAllAssets,
	getSingleAsset: getSingleAsset,
	createAsset: createAsset,
	// updateAsset: updateAsset,
	// removeAsset: removeAsset
};