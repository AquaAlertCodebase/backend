const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const { email, password,name, phoneNo } = req.body;
    const old = await User.findOne({ email: email.toLowerCase() });
    if (!old) {
      const encpassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        email: email.toLowerCase(),
        password: encpassword,
        phoneNo: phoneNo,
        name:name
      });
      if (result) {
        next();
      } else {
        return res.json({ success: false, msg: "User not created" });
      }
    } else {
      if (!old.emailverify) {
        next();
      } else {
        return res.json({ success: false, msg: "User already exists" });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.json({ success: false, msg: "User not found" });
    if (user.emailverify == true) {
      const cmp = await bcrypt.compare(password, user.password);
      if (!cmp) return res.json({ success: false, msg: "Wrong password" });
      const token = jwt.sign(
        { email: email.toLowerCase(), user: user._id },
        process.env.secretkey,
        { expiresIn: "1d" }
      );
      user.token = token;
      const updated = await user.save();
      if (updated) {
        return res.json({ success: true, msg: `Welcome`, token });
      }
    } else {
      return res.json({ success: false, msg: "Email not verified" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: "false", message: "User not found" });
    }
    const token = jwt.sign(
      { email: email.toLowerCase(), user: user._id },
      process.env.secretkey,
      { expiresIn: "1d" }
    );
    user.token = token;
    const updated = await user.save();
    if (updated) {
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const otpVerify = async (req, res, next) => {
  try {
    const email = req.user.email;
    const otp = req.body.otp;
    if (!otp) return res.json({ success: false, msg: "Please enter the otp" });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.json({ success: false, msg: "User does not exists" });
    const result = await bcrypt.compare(otp, user.otp);
    const token = jwt.sign(
      { email: email.toLowerCase(), user: user._id },
      process.env.secretkey,
      { expiresIn: "1d" }
    );
    if (result) {
      req.user.token = token;
      req.user.emailverify = true;
      const updated = await req.user.save();
      if (updated) {
        return res.json({ success: true, msg: "OTP verified", token });
      }
    }
    return res.json({ success: false, msg: "Wrong OTP entered" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const newpassword = req.body.newpassword;

    if (!checkpassword(newpassword)) {
      return res.json({
        success: false,
        msg: "Please enter a strong password",
      });
    }
    const encpassword = await bcrypt.hash(newpassword, 12);
    req.user.password = encpassword;
    const updated = await req.user.save();
    if (updated) {
      return res.json({
        success: true,
        msg: "Password changed",
        token: user.token,
      });
    }

    return res.json({ success: false, msg: "Password change failed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = {
  signUp,
  logIn,
  otpVerify,
  changePassword,
  forgotPassword
};
