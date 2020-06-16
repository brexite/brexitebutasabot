
const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, '../txt/log.txt');

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes

let suggestion = args.slice(0).join(" ");
if (!suggestion) return message.reply("write something you shit idiot");
  
fs.appendFile(certPath, "\n" + suggestion, (err) => {
  if (err) throw err;
});

  message.channel.send("thats cool mate cheers");
}
//name this whatever the command name is.
module.exports.help = {
  name: "suggestion"
}
