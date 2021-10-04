require('dotenv').config();
let config = require("../config.json")
const fs = require("fs");
const path = require("path");
const Discord = require('discord.js')

const replyPath = path.join(__dirname, "../assets/replyArray.json");
const replyJSON = require("../assets/replyArray.json");

module.exports = {
	name: "addreply",
	description: "Adds a reply to the replyArray",
	usage: "addreply <text>",
	category: "Bot Owner",
  args: true,
  execute: async (bot, message, args) => {

    let reply = args.slice(0).join(" ").trim();
    var match = /\r|\n/.exec(reply);
    
    if (match) return message.channel.send("Text contained newlines within, piss off kindly")

    replyJSON['replies'].push(reply);
      fs.writeFile(replyPath, JSON.stringify(replyJSON, null, "\t"), (err) => {

      if (err) return console.error(err)
    });

    let embed = new Discord.MessageEmbed()
    .setAuthor("REPLY #" + String(replyJSON.length), bot.user.avatarURL({ dynamic:true }))
    .addField("New Reply added: ", reply)
    .setTimestamp()
    .setColor(config.colour)
    .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));

    bot.guilds.cache.get(process.env.LOGSSERVER).channels.cache.get(process.env.LOGSCHANNEL).send({embeds: [embed]})

    message.channel.send("thats cool mate cheers");

  }
}