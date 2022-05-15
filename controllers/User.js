
const User = require('../models/User');
const Cryptojs = require('crypto-js');
// Get all users
exports.GetAllUsers = async (req,res,next)=>{
    const query = req.query.new
    try {
        
        const users =query 
        ? await User.find().sort({_id:-1}).limit(1) 
        : await User.find();
        
        if(!users){
            return res.status(400).json({
                message:"no users found!"
            })
        }
        res.status(200).json({
            success:true,
            data:users
        })
    } catch (error) {
        req.status(500).json({
            success:false
        })
    }
}
// Get user
exports.GetAUser = async (req,res,next)=>{
    try {
        const user =  await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({
                message:"no user found!"
            })
        }
        const {password,...others} = user._doc
        res.status(200).json({
        success:true,
        data:{...others}
        })
    } catch (error) {
        res.status(500).json({
            success:false
        })
    }
}

// user stats

exports.GetUsersStats = async (req,res,next)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
     try {
         const data = await  User.aggregate([
            {$match :{createdAt: {$gte:lastYear}}},
            {
                $project:{ 
                    month:{$month:"$createdAt"},
                },
            },

            {
                $group:{
                    _id:"$month",
                    total:{$sum:1},
                },
            },
         ]);

         res.status(200).json({
            success:true,
            data:data,
            })
     } catch (err) {
         res.status(500).json(err);
         console.log(err);
     }
}

// delete user
exports.DeleteUser = async (req,res,next)=>{
    try {
        const user =  await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({
                message:" No users found!"
            })
        }
        res.status(200).json({
            success:true,
            message:"user is deleted successful"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
// update user

exports.UpdateUser = async (req,res,next)=>{
        if(req.body.password){
            req.body.password = Cryptojs.AES.encrypt(req.body.password , process.env.PASS_SEC).toString();
            }
    try {
        const user =  await User.findByIdAndUpdate(req.params.id , {$set:req.body},{new:true})
        if(!user){
            return res.status(400).json({
                message:"no users found!"
            })
        }
        const {password,...others} = user._doc
        res.status(200).json({
        success:true,
        data:{...others},
        message:"user updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        console.log(error);
    }
}
