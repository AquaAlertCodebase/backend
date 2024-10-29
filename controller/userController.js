// import { getAll } from './applianceController';
// import main from '../utils/groqAPI';
// import Room from '../models/room';
// import Appliance from '../model/appliance';
// const userController = {
//     async updateRoom(req, res, next) {
//         const {time , flowRate, pressure} = req.body;
//         const userId = req.user._id;
//         const _rooms = await getAll(req, res, next);
//         const data = {device: {time, flowRate, pressure}, _rooms};
//         const groqResponse = await main(data);
//         const response = JSON.parse(groqResponse.choices[0].message.content);
//         let roomData = []
//         for (const room in response) {
//             roomData.push({roomName: room, probability: response[room]});
//         }
//         roomData = roomData.sort((a, b) => b.probability - a.probability);
//         res.json(response);
//         const eqpuipment = await room.findOne({userId: userId, roomName: roomData[0].roomName});
//         eqpuipment.waterConsum += flowRate*10;
//     }

// }


// const hardware = async (req, res, next) => {
//     try {
//       const { deviceId, rate, pressure, time } = req.body;
//       if (!time || isNaN(new Date(time).getTime())) {
//         return res.json({ success: false, message: "Invalid time format" });
//       }
//       const timeDate = new Date(time);
  
//       const hours = timeDate.getUTCHours();
//       const minutes = timeDate.getUTCMinutes();
//       const day = timeDate.getDate();
//       const device = await Device.findById(deviceId);
//       if (!device) {
//         return res.json({ success: false, message: "Device not found" });
//       }
//       const allAppliance = Appliance.find({deviceId:deviceId});
//       const data = {device: {time, rate, pressure}, allAppliance};
//       const groqResponse = await main(data);
//       const response = JSON.parse(groqResponse.choices[0].message.content);
//       let applianceData = []
//       for (const appliance in response) {
//           roomData.push({applianceName: appliance, probability: response[appliance]});
//       }
//       applianceData = applianceData.sort((a, b) => b.probability - a.probability);
//       res.json(response);
//       const appliance = await Appliance.findOne({userId: userId, applianceName: applianceData[0].applianceName});
//       const room=await Room.findById(appliance.roomId);
//       const waterConsum = rate * 10;
//       appliance.waterConsum += waterConsum;
//       device.hourConsum[minutes - 1] = waterConsum;
//       room.hourConsum[minutes - 1] = waterConsum;
//       const sumArray = (arr) => {
//         return arr.reduce(
//           (accumulator, currentValue) => accumulator + currentValue,
//           0
//         );
//       };
//       device.dailyConsum[hours - 1] = sumArray(device.hourConsum);
//       device.weekConsum[(day % 7) - 1] = sumArray(device.dailyConsum);
//       device.monthConsum[day - 1] = sumArray(device.monthConsum);
//       room.dailyConsum[hours - 1] = sumArray(room.hourConsum);
//       room.weekConsum[(day % 7) - 1] = sumArray(room.dailyConsum);
//       room.monthConsum[day - 1] = sumArray(room.monthConsum);
  
  
//        await device.save();
//        const updated=await room.save();
//       if (updated) {
//         return res.json({
//           success: true,
//           message: "Device updated",
//           token: req.user.token,
//           device: device,
//         });
//       } else {
//         return res.json({ success: false, message: "Device not updated" });
//       }
//     } catch (err) {
//       console.log(err);
//       next(err);
//     }
//   };

// module.exports=hardware;