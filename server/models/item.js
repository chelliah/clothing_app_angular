var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ItemSchema = new Schema({
    user_id: { type: String, ref: 'User' , required: true},
    url: {type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String},
    type: {type: String},
    size: {type: String, required: true},
    condition: {type: String, required: true},
    price: {type: Number, required: true},
    added: {type: Date, default: Date.now},
    comments: {type: String}
    //trade: Boolean,
    //purchase: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);