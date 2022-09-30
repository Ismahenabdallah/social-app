const mongoose = require("mongoose");
const {ObjectId} =mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  pic:{
    type:String,
    default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
   },
  googleId: String,
  secret: String,
  password:String,
  confirmPassword:String,
  status: {
    type: String, 
    enum: ['Desactive', 'Active'],
    default: 'Active'
  },
  coverPic: String,
  about: String,
  livesIn: String,
  worksAt: String,
  relationship: String,
  country: String,
  followers:[{type:ObjectId,ref:"users"}],
  following:[{type:ObjectId,ref:"users"}]
  
},
{ timestamps: true }

);

 mongoose.model("users", userSchema);
