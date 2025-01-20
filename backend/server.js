const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotanv = require('dotenv');
const { bgCyan } = require('colors');
require('colors');
const connectDB= require('./config/config');

//dotenv config 
dotanv.config();
//db config 
connectDB();


//rest objetct

const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"));


// ----------  routes -------------
//app.get('/',(req,res)=>{
  //  res.send('<h1>POS BACKEND</h1>');
//});
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/items",require("./routes/itemRoutes"));

app.use("/api/bills",require("./routes/billsRoute"));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server Running ON PORT ${PORT}`.bgCyan.white);
});



