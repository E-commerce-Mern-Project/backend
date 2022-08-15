const express = require('express');
const { createProduct,updateProduct,deleteProduct,getProduct,getAllProduct } = require('../controllers/Products');
const { verifyTokenAndAuthorisation, verifyToken, verifyTokenAndAdmin } = require('../controllers/verifyToken');
const Products = require('../models/Products');

const router =  express.Router();

router
.route('/')
.post(verifyTokenAndAdmin,createProduct)
.get(getAllProduct)

router
.route('/:id')
.put(verifyTokenAndAdmin,updateProduct)
.delete(verifyTokenAndAdmin,deleteProduct)

router
.route('/find/:id')
.get(getProduct)


module.exports = router;