"use strict";

require('dotenv').config();

let queryUtil = require("./queries.util");
const fs = require("fs");

const conn = require("./db");

const db = conn.connect2DB(process.env.PGDB_LIB);

let category_data = null;

fs.readFile("app/topics.json", "utf-8", (error,  data) => {
	if (error) {
		console.log(error);
		throw error;
	} else {
		category_data = JSON.parse(data);
		storeCategory();
	}
});

let storeCategory = () => {
	
	for (let i = 0; i < category_data.length; ++i) {
		
		if (category_data[i].category) {
			
			if (!category_data[i].subcategory) {
				category_data[i].subcategory = [];
			}
				
			category_data[i].subcategory = queryUtil.jsArrayToPSQLArray(category_data[i].subcategory);
			
			console.log(`INSERT INTO ${process.env.PGTB_CAT} VALUES ('${category_data[i].category}', '${category_data[i].subcategory}'`);
			
			db.query(`INSERT INTO ${process.env.PGTB_CAT} (category, subcategory) VALUES ('${category_data[i].category}', '${category_data[i].subcategory}');`)
			
		}
	}
};

let getAllAssets = (req, res, next) => {
	db.any(`SELECT * FROM category`)
		.then((data) => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved ALL categories'
				});
		})
		.catch((err) => {
			return next(err);
		})
};

module.exports = {
	getAllAssets: getAllAssets
};