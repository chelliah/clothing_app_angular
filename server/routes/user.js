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

//RETURNS ALL USERS EXCEPT USER IN SESSION
//router.get('/all', function(req,res){
//    console.log('hi everyone', req.user._id);
//    var stream = User.find({_id: {$ne: req.user._id}}).stream();
//    var users = [];
//    stream.on('data', function (doc) {
//        //console.log('here is a doc', doc._id);
//        users.push(doc);
//    }).on('error', function (err) {
//        if(err) console.log(err);
//    }).on('close', function () {
//        //console.log('final data', users);
//        res.send(users);
//    });
//});

//ADDS ITEM FOR SALE
//router.put('/entry', function(req,res){
//    User.findOneAndUpdate({_id: req.user._id}, { $push: {items: req.body}}, {upsert: true}, function(err, user){
//        //console.log("did it work", user);
//        if(err) return err;
//        res.send(user);
//    })
//});

//DELETES ITEM FROM SALE
//router.delete('/entry', function(req,res){
//    console.log(req.query.id);
//    //User.findById(req.user._id, function(err,user){
//    //    user.items.update()
//    //});
//    User.findOneAndUpdate({_id: req.user._id}, {$pull: {items: {_id: req.query.id}}}, function(err,user){
//        if(err) return err;
//        res.send(user);
//    });
//});

//Queries subdocuments
//router.get('/query', function(req,res){
//    var query = req.query;
//    //console.log('here is the query', query);
//
//    var convertQuery = function(query){
//        //console.log('starting function', typeof query);
//        if(typeof query === 'string'){
//            //console.log('converting to array');
//            return Array(query);
//        }else if(query == undefined){
//            return [undefined];
//        }else {
//            return query;
//        }
//    };
//
//    console.log(req.query);
//    ////{_id: {$ne: req.user._id}}
//    //User.find({}).populate({
//    //    path: 'items',
//    //    match: {
//    //        gender: { $in: convertQuery(query.gender)},
//    //        condition: { $in: convertQuery(query.condition)},
//    //        size: { $in: convertQuery(query.size)},
//    //        type: { $in: convertQuery(query.type)}
//    //    },
//    //    select: 'added _id url name gender type size condition price comments'
//    //
//    //}).exec(function(err,items){
//    //    if (err) console.log('here is the error: ', err);
//    //    console.log('here are the items', items)
//    //});
//
//    //User.find({"items.condition": query.condition}, function(err,data){
//    //    if(err) console.log(err);
//    //    console.log('here is the data', data)
//    //})
//
//    User.find({_id: {$ne: req.user._id},
//        'items.condition': {$nin: query.condition}
//        }).exec(function(err,data){
//        console.log(' here is the data', data);
//    });
//
//
//});

module.exports = router;