const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");



//SIGNUP 
router.post("/api/signup", async (req, res) => {

    const { email, password, confirmpassword } = req.body;

    const isUserExist = await User.find({ email });
    console.log(isUserExist);

    if (isUserExist.length) {
        return res.status(400).json({
            message: "User already registerd"
        })
    }

    if (password !== confirmpassword) {
        return res.status(400).json({
            message: "password and confirm password do not match"
        })
    }

    bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
            return res.status(400).json({
                message: "failed",
                error: err.message
            })
        }
        const userInfo = await User.create({
            email,
            password: hash
        })
        return res.status(200).json({
            message: "success",
            userInfo
        })
    })

})



// LOGIN FUNCTINALITY
router.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    const isUserExist = await User.find({ email });
    // console.log(isUserExist);

    if (!isUserExist.length) {
        return res.status(400).json({
            message: "User not registerd"
        })
    }

    bcrypt.compare(password, isUserExist[0].password, async function (err, result) {
        if (err) {
            return res.status(400).json({
                message: "failed",
                error: err.message
            })
        }
        if (result) {
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                data: isUserExist[0]._id
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                message: "login successfully",
                token,
                id: isUserExist[0]._id
            });
        } else {
            return res.status(400).json({
                message: "Wrong password"
            })
        }

    })

})



module.exports = router;