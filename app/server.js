"use strict";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require('./assets');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(cors());

app.get('/', (req, res) => {
	res.send("Hello from server.js");
});


app.get('/api/assets', db.getAllAssets);
app.get('/api/assets/:id', db.getSingleAsset);
app.post('/api/assets', db.createAsset);
app.put('/api/assets/:id', db.updateAsset);
app.delete('/api/assets/:id', db.removeAsset);

app.listen(8000, () => {
	console.log(`Listening on port 8000!`);
});