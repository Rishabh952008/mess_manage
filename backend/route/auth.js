var express = require("express");
var router = express.Router()
const jwt = require("jsonwebtoken")
const user_schema = require("../schemas/user")
const privateKey = 'Bokachoda'
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcrypt');

router.post('/signup',[
    body("email","invalid Mail").isEmail(),
    body("password","invalid password").isLength({min:5})
],async(req,res)=>{
    var err=validationResult(req);
    if(err.isEmpty()==false){
        return res.status(400);
    }
     

     try{
        let user = await user_schema.findOne({email: req.body.email});
     if(user){
        return res.status(500).json({message:"email already exists"});
     }
     var salt = await bcrypt.genSalt(10);
     const pass = await bcrypt.hash(req.body.password,salt);

     user = await user_schema.create({
        user_name:req.body.user_name,
        password:pass,
        email:req.body.email
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,privateKey);
    return res.json({token,message:"account created"});
     }
     catch(err){
        return res.json(err);
     }
    
})

router.post('/login',[
    body("email","invalid Mail").isEmail(),
    body("password","invalid password").exists()
],async(req,res)=>{
    var err=validationResult(req);
    if(err.isEmpty()==false){
        return res.status(400);
    }

    const {email,password}=req.body;
    try{
        const existingUser = await user_schema.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({message:"User Already Exists"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const data={
            existingUser:{
                id:existingUser.id
            }
        }
        const token= jwt.sign(data,privateKey);
        return res.status(500).json({message:"Login Successfull"})
    }
    catch (error){
        console.log("error coming on the way");
    }
})

module.exports = router;