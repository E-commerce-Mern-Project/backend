const Product = require('../models/Products');

//create product 

exports.createProduct= async (req,res,next)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            data:product
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.updateProduct = async(req,res,next)=>{
    try {
        const product = Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            if(!product){
                return res.status(400).json({
                    message:"no product found found!"
                })
            }
            res.status(200).json({
                success:true,
                message:"product updated",
                data:product
            })
    } catch (err) {
        res.status(500).json(err)
    }
} 

// delete update

exports.deleteProduct =async(req,res,next)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Product has been deleted..."});
    } catch (err) {
        res.status(500).json(err)
    }
} 

// get a product

exports.getProduct = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
}

// get all products 


exports.getAllProduct = async (req,res,next)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
    
        if (qNew) {
          products = await Product.find().sort({ createdAt: -1 }).limit(2);
        } else if (qCategory) {
          products = await Product.find({
            categories: {
              $in: [qCategory],
            },
          });
        } else {
          products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
}