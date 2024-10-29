const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const client = require("twilio")(process.env.accountSid, process.env.authToken);

const sent = async (req, res, next) => {
  try {
    const emailId = req.body.email || req.user.email;
    const otpGenerator = require("otp-generator");
    const old = await User.findOne({ email: emailId.toLowerCase() });

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const customMessage = `Here is your four digit OTP for login ${otp} . Do not share it with anyone, if this is not you contact support.`;
    client.messages
      .create({
        body: customMessage,
        from: process.env.twilioNo,
        to: "+919565549492",
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error));

    // const image=require('')

    const token = jwt.sign(
      { email: emailId.toLowerCase() },
      process.env.secretkey,
      { expiresIn: "1d" }
    );
    const otp2 = await bcrypt.hash(otp, 12);
    old.token = token;
    old.otp = otp2;
    old.expireotp = Date.now() + 120000;

    const updated = await old.save();
    if (!old)
      return res.status(201).json({
        success: true,
        password: false,
        msg: "User created successfully. Check mail",
        token,
      });
    else {
      return res.status(201).json({
        success: true,
        password: false,
        msg: "Enter otp sent to mail",
        token,
      });
    }
  } catch (err) {
    console.log("mail not sent");
    next(err);
  }
};

module.exports = sent;
