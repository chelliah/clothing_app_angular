var express = require('express');
var multer = require('multer');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var Field = require('../models/field')
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

var convertQuery = function(query, queryName){
    var field = Field.getLocalField(queryName);
    if(query == undefined){
        //console.log('its undefined');
        return field;
    }else if(typeof query === 'string'){
        //console.log('its a string!');
        return new Array(query);
    }else{
        return query;
    }
};

//QUERY
router.get('/query', function(req,res){
    //console.log(req.query);
    Item.find({
        $and: [
            {gender: {$in : convertQuery(req.query.gender, 'gender')}},
            {type: {$in : convertQuery(req.query.type, 'type')}},
            {condition: {$in : convertQuery(req.query.condition, 'condition')}},
            {size: {$in : convertQuery(req.query.size, 'size')}}
        ]
    }).where({user_id: {$ne: req.user._id}}).exec(function(err,items){
        if(err) console.log(err);
        //console.log("here are the returned results", items);
        res.send(items)
    })
});

//SEARCH
router.get('/search', function(req,res){
    var search = req.query.search.toLowerCase() + "{1,}";
   Item.find({name: {$regex: search}}).where({user_id: {$ne: req.user._id}}).exec(function(err,items){
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
        name: req.body.name.toLowerCase(),
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