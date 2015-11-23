var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

//var UserSchema = new Schema({
//    username: {type: String, required: true, index: {unique: true}},
//    password: {type: String, required: true},
//    firstName: {type: String, required: true},
//    lastName: {type: String, required: true},
//    email: {type: String, required: true}
//});

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    //wishList: [{ item : {type: String, required: true} }],
    items: [{
        url: {type: String, required: true},
        name: {type: String, required: true},
        gender: {type: String},
        type: {type: String},
        size: {type: String, required: true},
        condition: {type: String, required: true},
        price: {type: String, required: true},
        comments: {type: String}
        //trade: Boolean,
        //purchase: Boolean
    }]
});

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')) return next;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
