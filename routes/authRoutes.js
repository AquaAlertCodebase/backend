const express = require("express");
const authController = require("../controller/authController.js");
const { body } = require("express-validator");
const tokenverify = require("../middleware/isauth.js");
const sent= require("../middleware/mailer.js");
const validation=require("../middleware/validation.js")

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required"),

    body("password", "Please enter valid password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&#]/)
      .withMessage(
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
      ),

    body("name", "Please enter a valid name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces"),

    body("phoneNo")
      .trim()
      .isInt()
      .withMessage("Phone number must contain only numbers")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits long")
      .notEmpty()
      .withMessage("Phone number is required"),
  ],validation,
  authController.signUp,
  sent
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required"),

    body("password", "Please enter valid password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&#]/)
      .withMessage(
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
      ),
  ],validation,
  authController.logIn
);

router.post(
  "/forgotpassword",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required"),
  ],validation,
  authController.forgotPassword,
  sent
);

router.post(
  "/otpverify",
  [
    body("otp", "Please enter a valid OTP")
      .notEmpty()
      .withMessage("OTP cannot be empty")
      .isNumeric()
      .withMessage("OTP must be a number")
      .isLength({ min: 4, max: 4 })
      .withMessage("OTP must be exactly 4 digits long"),
  ],validation,
  tokenverify.verifytoken,
  authController.otpVerify
);

router.put("/resendotp", tokenverify.verifytoken, sent);

router.put(
  "/changepassword",
  [
    body("newpassword", "Please enter valid password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&#]/)
      .withMessage(
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
      ),
  ],validation,
  tokenverify.verifytoken,
  authController.changePassword
);

router.put(
  "/address",
  [
    body("houseNo")
      .trim()
      .notEmpty()
      .withMessage("House number is required")
      .isNumeric()
      .withMessage("House Number must be numeric"),

    body("add1")
      .trim()
      .notEmpty()
      .withMessage("Address line 1 is required")
      .isString()
      .withMessage("Address line 2 must be a string"),

    body("add2")
      .trim()
      .optional()
      .isString()
      .withMessage("Address line 2 must be a string"),

    body("add3")
      .trim()
      .optional()
      .isString()
      .withMessage("Address line 3 must be a string"),

    body("city")
      .trim()
      .notEmpty()
      .withMessage("City is required")
      .isString()
      .withMessage("City must be a string"),

    body("state")
      .trim()
      .notEmpty()
      .withMessage("State is required")
      .isString()
      .withMessage("State must be a string"),

    body("zip")
      .trim()
      .notEmpty()
      .withMessage("ZIP code is required")
      .isLength({ min: 7, max: 7 })
      .withMessage("ZIP code must be exactly 7 digits")
      .isNumeric()
      .withMessage("ZIP code must be numeric"),

    body("lat")
      .optional()
      .isDecimal()
      .withMessage("Latitude must be a decimal number"),

    body("lon")
      .optional()
      .isDecimal()
      .withMessage("Longitude must be a decimal number"),
  ],validation,
  tokenverify.verifytoken,
  authController.address
);

module.exports = router;
