/**
 * Created by aronthomas on 12/6/15.
 */
var express = require('express');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var router = express.Router();

var config = require('../../config.json');


var options = {
    auth: {
        api_user : process.env.SENGRID_API_USER || config.SENGRID_API_USER,
        api_key : process.env.SENDGRID_API_KEY || config.SENDGRID_API_KEY
    }
};

var client = nodemailer.createTransport(sgTransport(options));

router.post('/', function(req,res){
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.user.email, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plaintext body
        html: req.body.body // html body
    };

    // send mail with defined transport object
    client.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.send(info.response);
    });
    console.log('did i break')
});


module.exports = router;