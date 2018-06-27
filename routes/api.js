var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Article = require("../models/article");

var authMiddleWere = passport.authenticate('jwt', { session: false});

router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/signin', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

router.post('/article', authMiddleWere, function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var newArticle = new Article({
            description: req.body.description,
            text: req.body.text,
            title: req.body.title
        });

        newArticle.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Articles saved failed'});
            }
            res.json({success: true, msg: 'Successful created new article.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/article', function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Article.find(function (err, articles) {
            if (err) return next(err);
            res.json(articles);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;