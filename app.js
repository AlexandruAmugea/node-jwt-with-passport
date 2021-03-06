var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let mongoDBUri = process.env.MONGODB_URI || process.env.MONGOHQ_URL || config.database;

mongoose.connect(mongoDBUri);

var api = require('./routes/api');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Page under construction.');
});

app.use('/api', api);

module.exports = app;