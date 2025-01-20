const { bgYellow } = require('colors');
const mongoose = require('mongoose')

require('colors')


//conecDB Function

const connectDB= async ()=>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connectred ${conn.connection.host}`.bgYellow)

    }catch(error){
        console.log(`Error: ${error.message}`.bgRed);
        process.exit(1);
    }
    

}

//export 

module.exports = connectDB;
