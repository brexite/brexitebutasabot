const replyJSON = require("../assets/replyArray.json");
const replyArray = replyJSON["replies"];
require('dotenv').config();

module.exports = {
	name: "poke",
	description: "See what happens idiot",
	usage: "poke <question>",
	category: "Fun",
  execute: async (bot, message, args) => {

    message.channel.send(replyArray[Math.floor(Math.random()*replyArray.length)]);

  }
};
