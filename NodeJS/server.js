const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Module connect to mongodb
const MongoClient = require('mongodb').MongoClient;

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

/**
 * API HANDLE
 */
let url = 'mongodb://localhost:27017/';
let dbName = 'dinosaure';
let collection = 'account';

//Get data
app.get('/dinosaure', (req, res) => {
   var getdata = require('./getdata.js');
   getdata(req, res, MongoClient, url, dbName, collection);
});

// Create dinosaure
app.post('/dinosaure', (req, res) => {
    var postdata = require('./postdata.js');
    postdata(req, res, MongoClient, url, dbName, collection);
});

// delete dinosaure
app.delete('/dinosaure', (req, res) => {
    var deletedata = require('./deletedata.js');
    deletedata(req, res, MongoClient, url, dbName, collection);
});

// Add friend
app.post('/friend', (req, res) => {
    var addfriend = require('./addfriend.js');
    addfriend(req, res, MongoClient, url, dbName, collection);
});

// Remove friend
app.post('/remove', (req, res) => {
    var removefriend = require('./removefriend.js');
    removefriend(req, res, MongoClient, url, dbName, collection);
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

//login
app.get('/dinosaure', (req, res) => {
    var login = require('./login.js');
    login(req, res, MongoClient, url, dbName, collection);
 });