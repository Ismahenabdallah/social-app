const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserModel = require('../models/User');
const asynHandler = require('express-async-handler');




const authMiddelwears = asynHandler(async(req,res,next)=>{

let token;
///&&req.headers.role==="Admin" 
if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer ")){
  try {
    token=req.headers.authorization.split(' ')[1]

    const decoded= jwt.verify(token,process.env.PRIVATE_KEY )
    const user = await UserModel.findById(decoded._id)
    req.user=user;
    //console.log(req.user)
    if(req.user.status==="Active") {next()} else{
      res.json("please active your account")
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorised , invalid token ');
  }
}




}) 
  
module.exports= authMiddelwears;

       
        
        
  