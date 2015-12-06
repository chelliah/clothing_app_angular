/**
 * Created by aronthomas on 12/6/15.
 */
var express = require('express');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var router = express.Router();

//

var api = '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';

var options = {
    auth: {
        api_user : 'chelliah',
        api_key : 'telecaster#90'
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