const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "../txt/footerArray.txt");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  message.delete();
  message.channel.send('https://cdn.glitch.com/48b7f59d-ed30-4a81-932f-c52986aa6b02%2Fnospam.gif?v=1591650072189');
}
//name this whatever the command name is.
module.exports.help = {
  name: "nospam"
}