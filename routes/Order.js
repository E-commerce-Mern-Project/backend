const express = require('express');
const { createOrder, getAllOrder, updateOrder, getOrder, deleteOrder, monthlyIncome } = require('../controllers/Order');
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('../controllers/verifyToken');


const router = express.Router();

router
.route('/')
.post(verifyToken,createOrder)
.get(verifyTokenAndAdmin,getAllOrder)

router
.route('/income')
.get(verifyTokenAndAdmin,monthlyIncome)

router
.route('/:id')
.put(verifyTokenAndAdmin,updateOrder)
.delete(verifyTokenAndAdmin,deleteOrder)


router
.route('/:userId')
.get(verifyTokenAndAuthorisation,getOrder)

module.exports=router