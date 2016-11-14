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

let assetQty = 0;

let createAsset = (req, res, next) => {
	console.log(`Creating asset #${assetQty++} ...`);
	console.log(req.body);
	db.none('INSERT INTO assets' +
	'(media, type, title, author, source, category)' +
	'VALUES (${media}, ${type}, ${title}, ${author}, ${source}, ${category})',
		req.body)
		.then (() => {
			res.status(200)
				.json({
					status: "success",
					message: "Inserted ONE asset"
				});
		})
		.catch((error) => {
			return next(error);
		})
};

let updateAsset = (req, res, next) => {
	
	console.log(`updateAsset`);
	
	// console.log(req.body);
	
	let data = req.body;
	let id = req.params.id;
	
	// console.log(data);
	
	console.log(`UPDATE assets SET media=\'${data.media}\'::text, type=\'${data.type}\'::text, title=\'${data.title}\'::text, author=\'${data.author}\', source=\'${data.source}\'::text, category=\'${data.category}\' WHERE id = ${id}`);
	
	db.none(`UPDATE assets SET media=\'${data.media}\'::text, type=\'${data.type}\'::text, title=\'${data.title}\'::text, author=\'${data.author}\', source=\'${data.source}\'::text, category=\'${data.category}\' WHERE id = ${id}`)
		.then(() => {
			res.status(200)
				.json({
					status: "success",
					message: "Updated asset"
				});
		})
		.catch((error) => {
			return next(error);
		})
};

module.exports = {
	getAllAssets: getAllAssets,
	getSingleAsset: getSingleAsset,
	createAsset: createAsset,
	updateAsset: updateAsset
	// removeAsset: removeAsset
};