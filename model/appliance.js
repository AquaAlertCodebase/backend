const mongoose = require("mongoose");

const schema = mongoose.Schema;

const applianceSchema = new schema({
  applianceName: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    required: true,
  },
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "device",
    required: true,
  },
  waterConsum: {
    type: Number,
    default: 0,
  },
  calibrated: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("appliance", applianceSchema);
