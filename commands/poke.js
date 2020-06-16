const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, '../txt/replyArray.txt');
let config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes

var text = fs.readFileSync(certPath, "utf-8");
var replyArray = text.split("\n")
var numberArgs = parseInt(args[0]); // Counts in terms of the line in the txt (starting from 1)

if(message.author.id === config.ownerID){
  if(Number.isInteger(numberArgs) == true && numberArgs < replyArray.length + 1 && numberArgs >= 1 ) {
    message.channel.send(replyArray[numberArgs - 1]);
    return;
  }
}

  message.channel.send(replyArray[Math.floor(Math.random()*replyArray.length)]);
}
//name this whatever the command name is.
module.exports.help = {
  name: "poke"
}
