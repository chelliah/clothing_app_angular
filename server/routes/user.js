var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req,res){
    console.log(req.user);
    res.send(req.user);
});

//ADDS ITEM FOR SALE
router.put('/entry', function(req,res){

    //User.findById(req.user._id, function(err, user){
    //    if(err) return err;
    //    user.items.push(req.body);
    //    console.log('did it update', user);
    //    user.save(function(err){
    //        if (err) return err;
    //        console.log('did it save');
    //        res.send(user);
    //    })
    //});

    User.findOneAndUpdate({_id: req.user._id}, { $push: {items: req.body}}, {upsert: true}, function(err, user){
        console.log("did it work", user);
        if(err) return err;
        res.send(user);
    })
});

module.exports = router;