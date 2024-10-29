const Appliance = require("../model/appliance.js");

const getAll = async (req, res, next) => {
  try {
    const roomId=req.body;
    const appliance = await Appliance.find({ roomId:roomId});
    if (appliance) {
      return res.json({ success: true, appliance: appliance, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load appliance" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const applianceId = req.query.applianceId;
    const appliance = await Appliance.findById(applianceId);
    if (appliance) {
      return res.json({ success: true, appliance: appliance, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load appliance" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { applianceName, waterConsum, calibrated,roomId } = req.body;
    const appliance = await Appliance.create({
      applianceName: applianceName,
      waterConsum: waterConsum,
      calibrated: calibrated,
      roomId: roomId,
      deviceId:req.user.deviceId
    });
    if (appliance) {
      return res.json({
        success: true,
        msg: "Appliance created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create appliance" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { applianceId, applianceName, calibrated } = req.body;
    const appliance = await Appliance.findById(applianceId);
    if (!appliance) {
      return res.json({ success: "false", message: "Appliance not found" });
    }
    appliance.applianceName = applianceName;
    appliance.calibrated = calibrated;
    const updated = await appliance.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Appliance updated",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, message: "Appliance not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const applianceId = req.query.applianceId;
    const appliance = await Appliance.findById(applianceId);
    if (!appliance) {
      return res.json({ success: "false", message: "Appliance not found" });
    }
    const result = await Appliance.deleteOne({ _id: applianceId });
    if (result.deletedCount == 1) {
      return res.json({
        success: true,
        msg: "Appliance deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete appliance" });
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
  update,
  remove,
};
