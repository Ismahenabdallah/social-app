
const UserModel = require('../models/User');
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const followUsers = async (req, res) => {

  UserModel.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.users}
},{
    new:true
},(err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
  UserModel.findByIdAndUpdate(req.users,{
      $push:{following:req.body.followId}
      
  },{new:true}).select("-password").then(result=>{
      res.json(result)
  }).catch(err=>{
      return res.status(422).json({error:err})
  })

}
)


};
const FindSingleUser = async (req, res) => {
 
  try {
    
      const data = await UserModel.findOne({_id:req.params.id})
      res.status(200).json(data)

  } catch (error) {
      res.status(404).json(error.message)
  }
}

// Unfollow a User
// changed
const unfollowUsers = async (req, res) => {
 
   UserModel.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      UserModel.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
};
module.exports = {
  getAllUsers,
  followUsers,
  unfollowUsers,FindSingleUser
}
