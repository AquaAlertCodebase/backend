const mongoose = require("mongoose");

const schema = mongoose.Schema;

const roomSchema = new schema({
  roomName: {
    type: String,
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
  },hourConsum: {
      type: [Number],
      default: () => Array(60).fill(0),
    },
    dailyConsum: {
      type: [Number],
      default: () => Array(24).fill(0),
    },
    weekConsum: {
      type: [Number],
      default: () => Array(7).fill(0),
    },
    monthlyConsum: {
      type: [Number],
      default: () => Array(31).fill(0),
    },
    yearlyConsum: {
      type: [Number],
      default: () => Array(60).fill(0),
    }
});

module.exports = mongoose.model("room", roomSchema);
