
const bilsModel = require('../models/billsModel');



//add items 
 const addBillsController = async (req,res) =>{
    try {
        const newBill = new bilsModel(req.body);
        await  newBill.save();
        res.send("Bill Create!");
    } catch (error) {
       res.send("Algo salio mal al crear el check")
        console.log(error);

    }
 }

// get bills
const getBillsController = async (req,res) =>{

    try {
        const bills = await bilsModel.find();
        res.status(200).send(bills);
    } catch (error) {
        console.log(error);
    }

}

  
  
  


module.exports = {addBillsController,getBillsController}




