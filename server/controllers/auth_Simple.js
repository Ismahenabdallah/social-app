
const UserModel = require('../models/User');
require('dotenv').config()
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const validator = require("validator");
const useremail = process.env.USER
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCSESS_TOKEN, { expiresIn: '15m' })
}
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure:process.env.SECURE, // use SSL
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});
const Register = async (req, res) => {
    try {
        const { fullname, email, password, pic, confirmPassword } = req.body

       if (!fullname || !email || !password || !confirmPassword ||!pic )
            return res.status(400).json({ msg: "Please fill in all fields." })

        if (!validateEmail(email))
            return res.status(400).json({ msg: "Invalid emails." })
            
        const user = await UserModel.findOne({ email })
        if (user) return res.status(400).json({ msg: "This email already exists." })

        if (password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters." })
        if (!validator.equals(password, confirmPassword))
            return res.status(400).json({ msg: "Passwords not matches." })
            
            
        const passwordHash = await bcrypt.hashSync(password, 12)
        const newUser = new UserModel({
            ...req.body, password: passwordHash, confirmPassword: passwordHash
        })


        const activation_token = createActivationToken({ email })
        newUser.save()
            .then(user => {

                transporter.sendMail({
                    to: user.email,
                    from: useremail,
                    subject: "Verify your email adress please ",
                    html: `<div><h1>Email Confirmation</h1>
             <h3>Hello ${user.fullname}</h3>
             <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
             <a href=http://localhost:3000/confirm/${activation_token}> Click here</a>
             </div>`,
                })

            })
            .catch(err => {
                console.log(err)
            })


        res.json({ msg: "Register Success! Please activate your email to start." })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const verifyUser = async (req, res) => {
    try {
        const { activation_token } = req.params
        UserModel.findOne({
            activation_token
        })
            .then((user) => {

                if (!user) {
                    return res.status(404).json({ errors: "User Not found." });

                }
                user.status = "Active";
                user.save((err) => {
                    if (err) {
                        res.status(500).json({ errors: err });

                        return;
                    }
                });
            })

    } catch (err) {
        res.json(err)
    }
}
const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(422).json({ msg: "please add email or password" })

    const user = await UserModel.findOne({ email })
    if (!user)
        return res.status(400).json({ msg: "This email does not exist." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." })
    if (user.status !== "Active")

        return res.status(400).json({ msg: "Please Verify Your Email!" })

    var token = jwt.sign({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        pic: user.pic,
        status: user.status,
        coverPic:user.coverPic , 
        about:user.about,
        livesIn:user.livesIn,
        worksAt:user.worksAt,
        relationship:user.relationship,
        country:user.country,
        followers:user.followers,
        following:user.following,

    }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
    res.status(200).json({
        msg: "success",
        token: "Bearer " + token
    })


}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await UserModel.findOne({ email })
        console.log(user)
        if (!user) return res.status(400).json({ msg: "This email does not exist." })



        const access_token = createAccessToken({ id: user._id })

        transporter.sendMail({
            to: user.email,
            from: useremail,
            subject: "change password ",
            html: `
          <h3>Hello ${user.fullname}</h3>
          <p> Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/reset/${access_token}> Click here</a>
          `,
        }).catch(err => console.log(err));

        res.json({ msg: " please check your email." })
        // await UserModel.updateOne({ _id: user.id },{ password: "" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


const resetPassword = async (req, res) => {


    try {
        const { password, confirmPassword } = req.body

        const passwordHash = await bcrypt.hashSync(password, 10)
        confirmPassword= passwordHash
        await UserModel.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash ,  confirmPassword
        })

        res.json({ msg: "Password successfully changed!" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}




module.exports = {
    Register, Login, verifyUser, forgotPassword,
    resetPassword,
}