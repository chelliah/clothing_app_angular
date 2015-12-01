var express = require('express');
var multer = require('multer');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dhro0fkhc',
    api_key: '348353581476451',
    api_secret: '5MCQwZGVGX_z2N5Cp74rwE_-oVI'
});

//GET FOR SALE ITEMS
router.get('/sale', function(req,res){
    //console.log(req.user);
    //res.send(req.user);
    Item.find({user_id: {$ne: req.user._id}}).exec(function(err,items){
        if(err) console.log(err);
        //console.log(items);
        res.send(items);
    })
});

var convertQuery = function(query){
    console.log('preconverted', query);
    if(typeof query == String){
        //console.log('its a string!');
        return new Array(query);
    }else if(query == undefined){
        //console.log('its undefined');
        return [undefined];
    }else{
        return query;
    }
};

//QUERY
router.get('/query', function(req,res){
    console.log(req.query);
    Item.find({
        $or: [
            {gender: {$in : convertQuery(req.query.gender)}},
            {type: {$in : convertQuery(req.query.type)}},
            {condition: {$in : convertQuery(req.query.condition)}},
            {size: {$in : convertQuery(req.query.size)}}
        ]
    }).where({user_id: {$ne: req.user._id}}).exec(function(err,items){
        if(err) console.log(err);
        //console.log("here are the returned results", items);
        res.send(items)
    })
});
//GET USER ITEMS
router.get('/user', function(req,res){
    Item.find({user_id: req.user._id}).exec(function(err,items){
        if(err) console.log(err);
        res.send(items);
    });
});

//Delete Item
router.delete('/', function(req,res){
   var deleteID = req.query.id;
    Item.findByIdAndRemove(deleteID, function(err,response){
        if(err) console.log(err);
        console.log(response);
        res.send(response);
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
        res.send(response);
    });

});


module.exports = router;