const express = require('express');
const { createCart, deleteCart, updateCart, getAllCart, getCart } = require('../controllers/Carts');
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require('../controllers/verifyToken');


const router = express.Router();

router
.route('/')
.post(verifyToken,createCart)
.get(verifyTokenAndAdmin,getAllCart)

router
.route('/:id')
.put(verifyTokenAndAuthorisation,updateCart)
.delete(verifyTokenAndAuthorisation,deleteCart)

// user find his/her cart using id
router
.route('/:userId')
.get(verifyTokenAndAuthorisation,getCart)

module.exports=router