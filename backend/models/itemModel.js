const mongoose = require('mongoose')

const item5chema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamp:true}

);

const Items = mongoose.model('Items',item5chema);

module.exports = Items;
