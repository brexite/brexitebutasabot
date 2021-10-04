const replyJSON = require("../assets/replyArray.json");
const replyArray = replyJSON["replies"];
require('dotenv').config();

module.exports = {
	name: "poke",
	description: "See what happens idiot",
	usage: "poke",
	category: "Fun",
  execute: async (bot, message, args) => {
        
    var numberArgs = parseInt(args[0]); // Counts in terms of the line in the txt (starting from 1)

    //debug to see if all outputs are working
    if(process.env.BOTOWNERID === message.member.id){
      if(Number.isInteger(numberArgs) == true && numberArgs < replyArray.length + 1 && numberArgs >= 1 ) {
        message.channel.send(replyArray[numberArgs - 1]);
        return;
      }
    }

      message.channel.send(replyArray[Math.floor(Math.random()*replyArray.length)]);
  }
};
