const asyncHandler  = require('express-async-handler');
const User = require('../models/userModal');
const generateToken = require('../config/generateToken');



const registeruser = asyncHandler(async(req,res) =>{
    const {name,email,password, pic} = req.body;
    
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Enter All the fields");
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User Already Present");
    }

    const user = await User.create({
        name,email,password,pic,
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic :user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new error("User Creation failed");
    }

});

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic :user.pic,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new error("User NOT found");
    }

});


module.exports = { registeruser, authUser };