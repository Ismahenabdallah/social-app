const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserModel = require('../models/User');
const asynHandler = require('express-async-handler');




const authMiddelwears = asynHandler(async(req,res,next)=>{

let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
  try {
    token=req.headers.authorization.split(' ')[1]
    const decoded= jwt.verify(token,process.env.PRIVATE_KEY )
    const user = await UserModel.findById(decoded._id)
    req.user=user;
  
    next()
  } catch (error) {
    res.status(401);
    throw new Error('Not authorised , invalid token ');
  }
}




}) 
  
module.exports= authMiddelwears;

       
        
        
  