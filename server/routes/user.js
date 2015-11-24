var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req,res){
    //console.log(req.user);
    res.send(req.user);
});

//RETURNS ALL USERS
router.get('/all', function(req,res){
    console.log('hi everyone', req.user._id);
    var stream = User.find().stream();
    var users = [];
    stream.on('data', function (doc) {
        //console.log('here is a doc', doc._id);
        if(doc._id.toString() != req.user._id.toString()){
            //console.log('doc id', doc._id);
            //console.log('user id', req.user._id);
            users.push(doc);
        }
    }).on('error', function (err) {
        if(err) console.log(err);
    }).on('close', function () {
        //console.log('final data', users);
        res.send(users);
    });
});

//ADDS ITEM FOR SALE
router.put('/entry', function(req,res){
    User.findOneAndUpdate({_id: req.user._id}, { $push: {items: req.body}}, {upsert: true}, function(err, user){
        //console.log("did it work", user);
        if(err) return err;
        res.send(user);
    })
});

//
router.delete('/entry', function(req,res){
    console.log(req.query.id);
    //User.findById(req.user._id, function(err,user){
    //    user.items.update()
    //});
    User.findOneAndUpdate({_id: req.user._id}, {$pull: {items: {_id: req.query.id}}}, function(err,user){
        if(err) return err;
        res.send(user);
    });
});

module.exports = router;