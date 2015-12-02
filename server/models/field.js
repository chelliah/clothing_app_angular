//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var result;
//
//var FieldSchema = new Schema({
//    fieldName: String,
//    values: Array
//}, {collection: 'fields'});
//
//var Field = mongoose.model('Field', FieldSchema);
////module.exports = mongoose.model('Field', FieldSchema);
//
//var getField = function(field){
//    return Field.find({'fieldName': field}).exec(function(err,response){
//        if(err) console.log(err);
//        //console.log(response);
//        result = response[0].values;
//    })
//};

var exported = {
    //callField:  function(field){
    //    return getField(field);
    //},
    //getField: function(){
    //    return result;
    //},
    getLocalField:function(field){
        if(field=='size'){
            return [
                "XXS",
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXL",
                "00",
                "0",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "14",
                "16",
                "18",
                "20",
                "34",
                "36",
                "38",
                "40",
                "42",
                "44",
                "46",
                "48",
                "28x30",
                "30x30",
                "32x30",
                "34x30",
                "36x30",
                "38x30",
                "40x30",
                "28x32",
                "30x32",
                "32x32",
                "34x32",
                "36x32",
                "38x32",
                "40x32",
                "28x34",
                "30x34",
                "32x34",
                "34x34",
                "36x34",
                "38x34",
                "40x34",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "One Size",
                "N/A",
                "Other"
            ];
        }else if(field=='condition'){
            return [
                "Like New",
                "Good",
                "Well Worn"
            ];
        }else if(field=='type'){
            return [
                "Sweatshirts",
                "Jackets/Coats",
                "Shirts",
                "T-Shirts",
                "Blouses",
                "Sweaters/Cardigans",
                "Jeans",
                "Pants",
                "Shorts",
                "Skirts",
                "Boots",
                "Sneakers/Athletic",
                "Heels",
                "Flats",
                "Sandals",
                "Dress Shoes",
                "Dresses",
                "Suits",
                "Accessories",
                "Other"
            ];
        }else if(field=='gender'){
            return [
                "Male",
                "Female",
                "Neither/Unisex"
            ];
        }
    }
};

module.exports = exported;