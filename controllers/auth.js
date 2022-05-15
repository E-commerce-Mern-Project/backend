
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
const { use } = require('express/lib/router');

exports.Register = async (req,res,next)=>{
    try {
        const hashedPass=CryptoJS.AES.encrypt(req.body.password ,process.env.PASS_SEC ).toString();
        req.body.password=hashedPass;
       const user = await User.create(req.body);
       res.status(200).json({
           success:true,
           data:user
       })
        
    } catch (error) {
        res.status(400).json({
            success:false,
        })
        
    }
}

// login
exports.Login = async(req,res,next)=>{
    try {
        const user =  await User.findOne({username:req.body.username})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"failed to login  wrong username or password"
            });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword != req.body.password){
            return  res.status(401).json({
                success:false,
                message:"failed to login  wrong username or password"
            });
        }
        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:"2d"});

            const {password,...others} = user._doc
            res.status(200).json({
            success:true,
            data:{...others,accessToken}
            })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : err
        }); 

    }
}