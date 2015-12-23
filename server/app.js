var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');

var register = require('./routes/register');
var user = require('./routes/user');
var item = require('./routes/item');
var upload = require('./routes/upload');
var index = require('./routes/index');
var email = require('./routes/email');
var logout = require('./routes/logout');



// App Set //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/upload', upload);
app.use('/user', user);
app.use('/item', item);
app.use('/email', email);
app.use('/logout', logout);
app.use('/', index);


// Mongo Connection //
var mongoURI = process.env.MONGO_URI;

var mongoDB = mongoose.connect(mongoURI).connection;

mongoose.set('debug', true);

mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(){
    console.log("Connected to Mongo, meow!");
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
    console.log(process.env.IP);
});