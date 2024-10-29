const express = require("express");
const { query, body } = require("express-validator");
const tokenverify = require("../middleware/isauth.js");
const deviceController = require("../controller/deviceController.js");
const validation=require("../middleware/validation.js")

const router = express.Router();

router.post("/create", tokenverify.verifytoken, deviceController.create);

router.get(
  "/getone",
  [
    query("deviceId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],validation,
  tokenverify.verifytoken,
  deviceController.getOne
);

router.get("/getall", tokenverify.verifytoken, deviceController.getAll);

router.delete(
  "/delete",
  [
    query("deviceId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],validation,
  tokenverify.verifytoken,
  deviceController.remove
);

router.post("/create",[
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
    body("person")
      .optional()
      .isInt()
      .withMessage("Person must be a decimal number")],
      validation,
      tokenverify.verifytoken,
      deviceController.create);

router.post(
  "/hardware",
  [
    body("deviceId")
      .notEmpty()
      .withMessage("Device ID is required")
      .isMongoId()
      .withMessage("Device ID must be a valid MongoDB ObjectId"),

    body("rate")
      .notEmpty()
      .withMessage("Rate is required")
      .isNumeric()
      .withMessage("Rate must be a number"),

    body("pressure")
      .notEmpty()
      .withMessage("Pressure is required")
      .isNumeric()
      .withMessage("Pressure must be a number"),

    body("time")
      .notEmpty()
      .withMessage("Time is required")
      .isISO8601()
      .withMessage("Time must be a valid ISO 8601 date string"),
  ],validation,
  tokenverify.verifytoken,
  deviceController.hardware
);

module.exports = router;
