const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "../txt/footerArray.txt");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  var i = 0;
  var random = [Math.ceil(Math.random() * 25)];
  
  message.channel.send("p");
  const embed = new Discord.RichEmbed()
    .setTitle("p")
    .setDescription("p")
    .setAuthor("p", "https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078")
    .setColor(config.colour)
    .setURL("https://steamcommunity.com/groups/ihitp2018")
    while (i < random) { 
      embed.addField('p',
        "p", true)
      i++;
    }
    embed.setThumbnail("https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078")
    .setFooter("p", "https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078");
  message.channel.send({ embed });
}
//name this whatever the command name is.
module.exports.help = {
  name: "p"
}
