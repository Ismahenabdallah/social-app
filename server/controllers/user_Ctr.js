
const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const followUsers = async (req, res) => {
 const {followId}= req.body;
 const id=req.user._id;
 if (id ==followId) {
  res.status(403).json("Action Forbidden");
} 

/***
 * m -[followers[0], following[0]] (connecte req.user._id)
 * b -[followers[0], following[0]] (req.body)
 * ---> m follow b 
 * m -[followers[0], following[1]]
 * b -[followers[1], following[0]]
 */
const followUser = await UserModel.findById(followId); //followers[followId]
const followingUser = await UserModel.findById(id);    //following[ID]

if (!followUser.followers.includes(id)) {
  await followUser.updateOne({ $push: { followers: id } });
  await followingUser.updateOne({ $push: { following: followId } });
  res.status(200).json("User followed!");
} else {
  res.status(403).json("you are already following this user");
}
 /*****
  *  UserModel.findByIdAndUpdate(followId,{
    $push:{followers:id}
},{
    new:true
},(err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
  UserModel.findByIdAndUpdate(id,{
      $push:{following:followId}
      
  },{new:true}).select("-password").then(result=>{
      res.json(result)
  }).catch(err=>{
      return res.status(422).json({error:err})
  })

}
)
  */


};


// Unfollow a User
// changed
const unfollowUsers = async (req, res) => {
  const {unfollowId}= req.body;
  const id=req.user._id;
  if (id ==unfollowId) {
   res.status(403).json("Action Forbidden");
 } 


 const unfollowUser = await UserModel.findById(unfollowId); //followers[unfollowId]
const unfollowingUser = await UserModel.findById(id);    //following[ID]

if (unfollowUser.followers.includes(id)) {
  await unfollowUser.updateOne({ $pull: { followers: id } });
  await unfollowingUser.updateOne({ $pull: { following: unfollowId } });
  res.status(200).json("User Unfollowed!");
} else {
  res.status(403).json("you are already following this user");
}





  /**** UserModel.findByIdAndUpdate(unfollowId,{
        $pull:{followers:id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      UserModel.findByIdAndUpdate(id,{
          $pull:{following:unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    ) */
};


const FindSingleUser = async (req, res) => {
 
 /**** try {
    
      const data = await UserModel.findOne({_id:req.params.id})
      res.status(200).json(data)

  } catch (error) {
      res.status(404).json(error.message)
  } */
  UserModel.findOne({_id:req.params.id})
  .select("-password")
  .then(user=>{
       PostModel.find({postedBy:req.params.id})
       .populate("postedBy","_id fullname pic email ,followers,following,status")
       .exec((err,posts)=>{
           if(err){
               return res.status(422).json({error:err})
           }
           res.json({user,posts})
       })
  }).catch(err=>{
      return res.status(404).json({error:"User not found"})
  })
}
const updateProfile= async(req,res)=>{
  try {
    UserModel.findByIdAndUpdate(req.user._id,req.body,{new:true},
      (err,result)=>{
       if(err){
           return res.status(422).json({error:"pic canot post"})
       }
       res.json(result)
  })
  } catch (error) {
    res.status(404).json(error.message)
  }
}
const searchUser = async (req, res)=>{
  let userPattern = new RegExp("^"+req.body.query)
  UserModel.find({email:{$regex:userPattern}})
  .select("_id email")
  .then(user=>{
      res.json(user)
      console.log(user)
  }).catch(err=>{
      console.log(err)
  })
}
module.exports = {
  getAllUsers,
  followUsers,
  unfollowUsers,
  FindSingleUser,
  updateProfile,
  searchUser
}
