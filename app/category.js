"use strict";

const fs = require('fs');

let topics_data = null;

fs.readFile('topics.json', 'utf-8', (error,  data) => {
	if (error) {
		console.log(error);
		throw error;
	} else {
		topics_data = JSON.parse(data);
		console.log(topics_data);
	}
});