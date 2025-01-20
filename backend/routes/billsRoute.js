
const express = require('express')
const {addBillsController,getBillsController} =require("./../controllers/billsController");

const router = express.Router()




//Method - POST
router.post('/add-bills',addBillsController)

//Method - Get
router.get('/get-bills',getBillsController)



module.exports = router;

