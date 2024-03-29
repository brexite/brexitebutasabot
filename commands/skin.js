const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
let config = require('../config.json'),
    colour = config.colour;

module.exports = {
	name: "skin",
	description: "Finds your minecraft skin on mine.ly",
	usage: "skin <username>",
	category: "Game",
  args: true,
  execute: async (bot, message, args) => {
  
    let username = args.join(" ");

    const embed = new Discord.MessageEmbed()
      .setTitle("https://mine.ly/" + username + ".1")
      .setAuthor(
        "Here is your minecraft skin!",
        "https://cdn.discordapp.com/attachments/612022828782452746/892398497821765652/Grass-Block-600x600.png"
      )
      .setColor(config.colour)
      .setThumbnail("https://minotar.net/avatar/" + username + ".png")
      .setTimestamp()
      .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    message.reply({embeds: [embed]});
  }
};
