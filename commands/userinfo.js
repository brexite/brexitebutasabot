const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverdata = require("../assets/serverdata.json");
require('dotenv').config();

module.exports = {
  name: 'userinfo',
  aliases: ["version"],
  description: 'Gets information on the user, or a specified user',
  usage: `userinfo`,
  category: "Util",
  execute: async (bot, message, args) => {
    return message.channel.send("Command under construction, come back later.")
  }
}