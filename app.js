const express = require("express");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const deviceRoutes = require("./routes/deviceRoutes.js");
const roomRoutes = require("./routes/roomRoutes.js");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.dburl)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   const accountSid = process.env.authSid;
// const authToken = process.env.authToken;
// const client = require('twilio')(accountSid, authToken);

// client.messages.create({
//   body: 'Hello from AquaAlert.',
//   from: '919565549492', // Your Twilio phone number
//   to: '+919555353797'   // Recipient's phone number
// })


app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/device", deviceRoutes);

app.use("/", (req, res) => {
  res.json({ msg: "success" });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
