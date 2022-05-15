const Order = require('../models/Order');

//create order 

exports.createOrder = async (req,res,next)=>{
    try {
        const order = await Order.create(req.body);
        res.status(200).json({
            success:true,
            data:order
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

// update

exports.updateOrder = async(req,res,next)=>{
    try {
        const order = Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            if(!order){
                return res.status(400).json({
                    message:"no order found found!"
                })
            }
            res.status(200).json({
                success:true,
                message:"order updated",
                data:order
            })
    } catch (err) {
        res.status(500).json(err)
    }
} 

// delete 

exports.deleteOrder =async(req,res,next)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(400).json({
                message:"no order found found!"
            })
            console.log(hello);
        }
        res.status(200).json({message:"Order has been deleted..."});
    } catch (err) {
        res.status(500).json(err)
    }
} 

// get a order

exports.getOrder = async(req,res,next)=>{
    try {
        const order = await Order.find({
            userId:req.params.userId
        })
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      }
}

// get all order 

exports.getAllOrder = async (req,res,next)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
}


// monthly income 

exports.monthlyIncome = async(req,res,next)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.setMonth()-1));
    const prevMonth = new Date(new Date().setDate(lastMonth.setMonth()-1))
    try {
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:prevMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err)
    }
}