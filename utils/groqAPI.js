const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main(data) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an advanced water usage analysis system designed to interpret data from a main water device and determine which household equipment is likely using water at any given time. Your responses should be data-driven, considering factors such as time of day, flow rates, water pressure, and typical usage patterns. Always provide your analysis in JSON format . Be precise in your probability calculations and consider the possibility of multiple devices being used simultaneously.",
      },
      {
        role: "user",
        content: `Given the following water usage data from a main entrance water device
          - Time: ${data.device.time}
          - Water flow rate: ${data.device.flowRate} L/min
          - Water pressure: ${data.device.pressure} Mega Pascals 
          \n\nAnd the following calibrated maximum flow rates for individual equipment:
            ${data.rooms
              .map((room) => {
                return ` - ${room.roomName}: ${room.waterConsum} L/min`;
              })
              .join("\n")}
            }
          n\nAnalyze the current water usage data and determine the probability of each equipment using water at this moment. Consider factors such as typical usage patterns based on the time of day, the relationship between flow rate and pressure, and the possibility of multiple devices being used simultaneously.\n\nProvide your analysis as a JSON object with each equipment as a key and its probability of current usage as a value (0 to 1).  For example:\n\n{\n  "kitchen_sink": 0.2,\n  "bathroom_sink": 0.1,\n  "shower": 0.6,\n  "toilet": 0.05,\n  "washing_machine": 0.0,\n  "dishwasher": 0.0,\n  "garden_hose": 0.05\n}\n\n`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
  });

  console.log(chatCompletion.choices[0].message.content);
}

export default main;
