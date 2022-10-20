const express = require("express");
const Router = express.Router();
//const passport = require("passport");
const { Register, verifyUser, Login, forgotPassword, resetPassword } = require("../controllers/auth_Simple");
const { getAllUsers, followUsers, unfollowUsers, FindSingleUser, updateProfile } = require("../controllers/user_Ctr");
const authMiddelwears = require("../middleware/authMiddelwears");
const {   SharePost, SubPost, allPost, likes, dislikes } = require("../controllers/post_ctr");
///Router.get(
///  "/auth/google",
///  passport.authenticate("google", { scope: ["profile", "email"] })
///);
///
///Router.get(
///  "/auth/google/callback",
///  passport.authenticate("google", {
///    failureRedirect: "http://localhost:3000/login",
///  }),
///  function (req, res) {
///    // Successful authentication, redirect home.
///    console.log(req);
///    res.redirect(
///      `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
///    );
///  }
///);
const passport = require("passport");


Router.post('/register',Register);
Router.post('/login',Login);
Router.get("/confirm/:activation_token", verifyUser)
Router.post('/forget', forgotPassword)
Router.post('/reset/', resetPassword)
Router.get('/getallusers', authMiddelwears,getAllUsers)
Router.get('/user/:id',authMiddelwears, FindSingleUser)
Router.put('/follow',authMiddelwears,followUsers)
Router.put('/unfollow',authMiddelwears, unfollowUsers)
Router.post('/update',authMiddelwears, updateProfile)
//post 
Router.post('/share',authMiddelwears,SharePost)
Router.get('/sub',authMiddelwears, SubPost)
Router.get('/allpost',authMiddelwears, allPost)
Router.put('/like',authMiddelwears, likes)
Router.put('/dislike',authMiddelwears, dislikes)
module.exports = Router;
