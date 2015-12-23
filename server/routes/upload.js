var express = require('express');
var multer = require('multer');
var router = express.Router();
var cloudinary = require('cloudinary');

var uploaded = multer({
    dest: './tmp/',
    inMemory: true
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//ADD NEW ITEM
router.post('/url', uploaded.single('file'), function(req,res){
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, function(result){
        console.log(result);
        res.send(result)
    });
});


module.exports = router;
