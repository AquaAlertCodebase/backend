const Notification=require("../model/notification");
const { validationResult } = require("express-validator");

const getAll = async (req, res, next) => {
    try {
      const notification = await Notification.find({ userId: req.user._id });
      if (notification) {
        return res.json({ success: true, notification: notification, token: req.user.token });
      } else {
        return res.json({ success: false, msg: "Failed to load notification" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  const getOne = async (req, res, next) => {
    try {
      const notificationId = req.query.notificationId;
      const notification = await Notification.findById(notificationId);
      if (notification) {
        return res.json({ success: true, notification: notification, token: req.user.token });
      } else {
        return res.json({ success: false, msg: "Failed to load notification" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  module.exports = {
    getAll,
    getOne,
  };
  