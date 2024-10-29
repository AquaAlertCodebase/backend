const mongoose = require("mongoose");

const schema = mongoose.Schema;

const notificationSchema = new schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
},
{ timestamps: true });

module.exports = mongoose.model("notification", notificationSchema);
