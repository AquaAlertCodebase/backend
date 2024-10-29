const Room = require("../model/room.js");

const getAll = async (req, res, next) => {
  try {
    const room = await Room.find({ userId: req.user._id });
    if (room) {
      return res.json({ success: true, room: room, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;
    const room = await Room.findById(roomId);
    if (room) {
      return res.json({ success: true, room: room, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { roomName, waterConsum} = req.body;
    const room = await Room.create({
      roomName: roomName,
      waterConsum: waterConsum,
      deviceId: req.user.deviceId,
    });
    if (room) {
      return res.json({
        success: true,
        msg: "Room created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { roomId, roomName} = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: "false", message: "Room not found" });
    }
    room.roomName = roomName;
    const updated = await room.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Room updated",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, message: "Room not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: "false", message: "Room not found" });
    }
    const result = await Room.deleteOne({ _id: roomId });
    if (result.deletedCount == 1) {
      return res.json({
        success: true,
        msg: "Room deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const hardware = async (req, res, next) => {
  try {
    const { deviceId, rate, pressure, time } = req.body;
    if (!time || isNaN(new Date(time).getTime())) {
      return res.json({ success: false, message: "Invalid time format" });
    }
    const timeDate = new Date(time);

    const hours = timeDate.getUTCHours();
    const minutes = timeDate.getUTCMinutes();
    const day = timeDate.getDate();
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.json({ success: false, message: "Device not found" });
    }
    const allAppliance = Appliance.find({deviceId:deviceId});
    const data = {device: {time, rate, pressure}, allAppliance};
    const groqResponse = await main(data);
    const response = JSON.parse(groqResponse.choices[0].message.content);
    let applianceData = []
    for (const appliance in response) {
        roomData.push({applianceName: appliance, probability: response[appliance]});
    }
    applianceData = applianceData.sort((a, b) => b.probability - a.probability);
    res.json(response);
    const appliance = await Appliance.findOne({userId: userId, applianceName: applianceData[0].applianceName});
    const room=await Room.findById(appliance.roomId);
    const waterConsum = rate * 10;
    appliance.waterConsum += waterConsum;
    device.hourConsum[minutes - 1] = waterConsum;
    room.hourConsum[minutes - 1] = waterConsum;
    const sumArray = (arr) => {
      return arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    };
    device.dailyConsum[hours - 1] = sumArray(device.hourConsum);
    device.weekConsum[(day % 7) - 1] = sumArray(device.dailyConsum);
    device.monthConsum[day - 1] = sumArray(device.monthConsum);
    room.dailyConsum[hours - 1] = sumArray(room.hourConsum);
    room.weekConsum[(day % 7) - 1] = sumArray(room.dailyConsum);
    room.monthConsum[day - 1] = sumArray(room.monthConsum);


     await device.save();
     const updated=await room.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Device updated",
        token: req.user.token,
        device: device,
      });
    } else {
      return res.json({ success: false, message: "Device not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  hardware
};
