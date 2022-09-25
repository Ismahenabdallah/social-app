const UserModel = require("../models/User");
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const followUsers = async (req, res) => {
  const id = req.params.id; /* who should be followed --> eli connecter mich ya3mel follow */
  const { _id } = req.body; /***he wants to follow  --> eli t7eb tra el post mta3ou (eli 3matlou follow )  */ 
  console.log(id, _id)
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
          } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
const unfollowUsers = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if(_id === id)
  {
    res.status(403).json("Action Forbidden")
  }
  else{
    try {
      const unFollowUser = await UserModel.findById(id)
      const unFollowingUser = await UserModel.findById(_id)


      if (unFollowUser.followers.includes(_id))
      {
        await unFollowUser.updateOne({$pull : {followers: _id}})
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Unfollowed Successfully!")
      }
      else{
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};
module.exports = {
  getAllUsers,
  followUsers,
  unfollowUsers,
};
