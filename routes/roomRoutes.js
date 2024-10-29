const express = require("express");
const { query, body } = require("express-validator");
const tokenverify = require("../middleware/isauth.js");
const roomController = require("../controller/roomController.js");
const validation=require("../middleware/validation.js")

const router = express.Router();

router.post(
  "/create",
  [
    body("roomName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces"),
    body("calibrated")
      .optional()
      .isNumeric()
      .withMessage("Calibrated value must be a number"),
  ],validation,
  tokenverify.verifytoken,
  roomController.create
);

router.get(
  "/getone",
  [
    query("roomId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],validation,
  tokenverify.verifytoken,
  roomController.getOne
);

router.get("/getall", tokenverify.verifytoken, roomController.getAll);

router.delete(
  "/delete",
  [
    query("roomId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],validation,
  tokenverify.verifytoken,
  roomController.remove
);

router.put(
  "/update",
  [
    query("roomId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
    body("roomName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name can only contain letters and spaces"),
    body("calibrated")
      .optional()
      .isNumeric()
      .withMessage("Calibrated value must be a number"),
  ],validation,
  tokenverify.verifytoken,
  roomController.update
);

module.exports = router;
