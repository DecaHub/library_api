"use strict";

let queryUtil = require("./queries.util");
const conn = require("./db");

let db = conn.connect2DB(process.env.PGDB_LIB);

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
	
	req.body.author = queryUtil.jsArrayToPSQLArray(req.body.author);
	req.body.category = queryUtil.jsArrayToPSQLArray(req.body.category);
	
	
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
	
	req.body.author = queryUtil.jsArrayToPSQLArray(req.body.author);
	req.body.category = queryUtil.jsArrayToPSQLArray(req.body.category);
	
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