const mongoose = require('mongoose')

const user5chema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    userId:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean
    },
    
   
},{timestamp:true}

);

const User = mongoose.model('users',user5chema);

module.exports = User;