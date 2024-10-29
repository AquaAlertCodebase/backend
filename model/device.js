const mongoose = require("mongoose");

const schema = mongoose.Schema;

const addressSchema = new schema({
  houseNo: {
    type: Number,
    required: true,
  },
  add1: {
    type: String,
    required: true,
  },
  add2: {
    type: String,
    required: false,
  },
  add3: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: false,
  },
  lon: {
    type: Number,
    required: false,
  },
});

const deviceSchema = new schema(
  {
    rate: {
      type: Number,
      default: 0,
    },
    pressure: {
      type: Number,
      default: 0,
    },
    person:{
      type:Number,
      required:true
    },
    address: {
      type: addressSchema,
      required: true,
    },
    hourConsum: {
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("device", deviceSchema);
