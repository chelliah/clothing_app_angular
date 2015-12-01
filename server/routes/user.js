var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req,res){
    //console.log(req.user);
    res.send(req.user);
});

router.get('/all', function(req,res){
    User.find({_id: {$ne: req.user._id}}).exec(function(err,users){
        if(err) console.log(err);
        console.log(users);
        res.send(users);
    })
});

router.get('/seller', function(req,res){
    User.find({_id: req.query.id}).exec(function(err,users){
        if(err) console.log(err);
        console.log(users);
        res.send(users);
    })
});

module.exports = router;