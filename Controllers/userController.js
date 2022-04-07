const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const { User } = require("../models/Users");
const { Otp } = require("../models/Otp");

module.exports.signUp = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if(user) return res.status(400).send("User already registered");
    const OTP = otpGenerator.generate(6,{
        digits: true, alphabets: false, upperCase: false, specialChars: false
    });
    const email = req.body.email;
    console.log(OTP);

    const otp = new Otp({email: email, otp: OTP});
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send("Otp send successfully");

};
module.exports.verifyOtp = async (req, res) => {};
