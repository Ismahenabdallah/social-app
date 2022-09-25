const express = require("express");
const Router = express.Router();
const passport = require("passport");
const { Register, verifyUser, Login, forgotPassword, resetPassword } = require("../controllers/auth_Simple");
const { getAllUsers, followUsers, unfollowUsers } = require("../controllers/user_Ctr");
const access_login = require("../middleware/access_login");

Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    res.redirect(
      `http://localhost:3000?email=${req.user.email}&fullname=${req.user.fullname}&secret=${req.user.secret}`
    );
  }
);
Router.post('/register',Register);
Router.post('/login',Login);
Router.get("/confirm/:activation_token", verifyUser)
Router.post('/forget', forgotPassword)
Router.post('/reset/', access_login, resetPassword)
Router.get('/getallusers', getAllUsers)
Router.put('/follow/:id',passport.authenticate("jwt", { session: false }), followUsers)
Router.put('/unfollow/:id',passport.authenticate("jwt", { session: false }), unfollowUsers)
module.exports = Router;
