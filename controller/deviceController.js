const Device = require("../model/device.js");
const { validationResult } = require("express-validator");

const getAll = async (req, res, next) => {
  try {
    const device = await Device.find({ userId: req.user._id });
    if (device) {
      return res.json({ success: true, device: device, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId;
    const device = await Device.findById({ _id: deviceId });
    if (device) {
      return res.json({ success: true, device: device, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { houseNo, add1, add2, add3, city, state, zip, lat, lon,person } = req.body;
    const device = await Device.create({
      address : {
        houseNo,
        add1,
        add2,
        add3,
        city,
        state,
        zip,
        lat,
        lon,
      },
      person:person
    });
    if (device) {
      req.user.deviceId=device._id;
      await req.user.save();
      return res.json({
        success: true,
        msg: "Device created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId;
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.json({ success: false, msg: "No Device found" });
    }
    const result = await Device.deleteOne({ _id: deviceId });

    if (result.deletedCount === 1) {
      return res.json({
        success: true,
        msg: "Device deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};





module.exports = {
  create,
  getAll,
  getOne,
  hardware,
  remove
};
