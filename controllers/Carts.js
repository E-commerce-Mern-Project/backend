const Cart = require('../models/Cart');

//create cart 

exports.createCart= async (req,res,next)=>{
    try {
        const cart = await Cart.create(req.body);
        res.status(200).json({
            success:true,
            data:cart
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

// update

exports.updateCart = async(req,res,next)=>{
    try {
        const cart = Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            if(!cart){
                return res.status(400).json({
                    message:"no cart found found!"
                })
            }
            res.status(200).json({
                success:true,
                message:"cart updated",
                data:cart
            })
    } catch (err) {
        res.status(500).json(err)
    }
} 

// delete 

exports.deleteCart =async(req,res,next)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Cart has been deleted..."});
    } catch (err) {
        res.status(500).json(err)
    }
} 

// get a cart

exports.getCart = async(req,res,next)=>{
    try {
        const cart = await Cart.find({
            userId:req.params.userId
        })
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
}

// get all cart 

exports.getAllCart = async (req,res,next)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
}
