var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');


//GET FOR SALE ITEMS
router.get('/sale', function(req,res){
    //console.log(req.user);
    //res.send(req.user);
    Item.find({user_id: {$ne: req.user._id}}).exec(function(err,items){
        if(err) console.log(err);
        console.log(items);
        res.send(items);
    })
});

//GET USER ITEMS
router.get('/user', function(req,res){
    Item.find({user_id: req.user._id}).exec(function(err,items){
        if(err) console.log(err);
        console.log(items);
        res.send(items);
    });
});

//Delete Item
router.delete('/', function(req,res){
   var deleteID = req.query.id;
    Item.findByIdAndRemove(deleteID, function(err,response){
        if(err) console.log(err);
        console.log(response);
    })
});

//ADD NEW ITEM
router.post('/', function(req,res){
    var item = new Item({
        user_id: req.user._id,
        url: req.body.url,
        name: req.body.name,
        gender: req.body.gender,
        type: req.body.type,
        size: req.body.size,
        condition: req.body.condition,
        price: req.body.price,
        comments: req.body.comments
    });
    item.save(function(err, response){
        if (err) console.log(err);
        console.log(response);
    })
});


module.exports = router;