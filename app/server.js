"use strict";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db_asset = require('./assets');
const db_category = require('./category');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(cors());

app.get('/', (req, res) => {
	res.send("Hello from server.js");
});


app.get('/api/assets', db_asset.getAllAssets);
app.get('/api/assets/:id', db_asset.getSingleAsset);
app.post('/api/assets', db_asset.createAsset);
app.put('/api/assets/:id', db_asset.updateAsset);
app.delete('/api/assets/:id', db_asset.removeAsset);

app.get('/api/categories', db_category.getAllAssets);

app.listen(8000, () => {
	console.log(`Listening on port 8000!`);
});