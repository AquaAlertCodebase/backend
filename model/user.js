const mongoose = require("mongoose");

const schema = mongoose.Schema;



const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
  },

  expireotp: {
    type: Date,
  },

  token: {
    type: String,
  },

  emailverify: {
    type: Boolean,
    default: false,
  },
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "device",
    required: true,
  }

});

module.exports = mongoose.model("user", userSchema);
