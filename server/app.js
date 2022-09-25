const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require('mongoose')
var clc = require("cli-color");
var bodyParser = require('body-parser')
const logger = require("morgan");
const dotenv = require("dotenv");
const Auth = require("./routes/index");
const cors = require("cors");
const passport = require("passport");
const app = express();
//cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods',"Get,Post,Put,Delete")
  res.header('Access-Control-Allow-headers',"Content-Type")
}) 
//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
dotenv.config();
app.use(express.json({limit:"50mb", extended: false}));
app.use(express.urlencoded({limit:"50mb", extended: false }));
app.use(bodyParser.json({limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended:false }));



mongoose.connect("mongodb://localhost:27017/social-app",
  {
     
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      
     
  })
  .then(() => console.log(clc.yellow.underline(`Server running on PORT ${process.env.PORT}...`)))
  .catch(err => console.log(err))
//morgan
app.use(logger("dev"));


app.use(passport.initialize())
require('./middleware/passport')(passport)
require("./controllers/auth_Google_Ctrl")(passport);

app.use("/", Auth);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
