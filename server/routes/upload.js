var express = require('express');
var multer = require('multer');
var router = express.Router();
var cloudinary = require('cloudinary');

var uploaded = multer({
    dest: './tmp/',
    inMemory: true
});

cloudinary.config({
    cloud_name: 'dhro0fkhc',
    api_key: '348353581476451',
    api_secret: '5MCQwZGVGX_z2N5Cp74rwE_-oVI'
});


//ADD NEW ITEM
router.post('/url', uploaded.single('file'), function(req,res){
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, function(result){
        console.log(result);
        res.send(result)
    });
});


module.exports = router;/**
 * Created by aronthomas on 12/1/15.
 */
