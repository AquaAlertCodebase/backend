
// const client = require('twilio')(accountSid, authToken);

// const verificationCode = '123456'; // Generate or retrieve the verification code dynamically
// const customMessage = `Here is your four digit OTP for login ${otp} . Do not share it with anyone, if this is not you contact support.`;

// try{
//       client.messages.create({
//     body: customMessage,
//     from: '+18545044580', // Your Twilio phone number
//     to: '+919565549492'
// })
// .then(message => console.log(message.sid))
// .catch(error => console.error(error));
// }
// catch(err)
// {
//       next(err)
      
// }


// async function mail() {
//       try {
//         var transporter = nodemailer.createTransport({
//           secure: true,
//           service: "gmail",
//           auth: {
//             user: process.env.AUTH_EMAIL,
//             pass: process.env.AUTH_PASS,
//             authentication: "plain",
//           },
//           tls: {
//             rejectUnauthorized: false,
//           },
//         });
//         const data = {
//           from: "sahayak@aicte.com",
//           to: emailId,
//           subject: "Verify your email",
//           text: `Here is your four digit OTP for login ${otp} . Do not share it with anyone, if this is not you contact support.`,
//         };

//         await transporter.sendMail(data)
//       } catch (err) {
//         next(err)
//       }
//     }
//     await mail();