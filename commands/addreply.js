const { Permissions } = require('discord.js');
require('dotenv').config();
let config = require("../config.json")
const fs = require("fs");
const path = require("path");
const Discord = require('discord.js')

module.exports = {
	name: "addreply",
	description: "Adds a reply to the replyArray",
	usage: "addreply <text>",
	category: "Admin",
  args: true,
  execute: async (bot, message, args) => {

    let reply = args.slice(0).join(" ");
      
    fs.appendFile(path.join(__dirname, "../assets/replyArray.txt"), reply + "\n", err => {
      if (err) throw err;
    });
      
    message.channel.send("thats cool mate cheers");

    var text = fs.readFileSync(path.join(__dirname, "../assets/replyArray.txt"), "utf-8");
    var replyArray = text.split("\n")

    let embed = new Discord.MessageEmbed()
    .setAuthor("REPLY #" + String(replyArray.length), bot.user.avatarURL({ dynamic:true }))
    .addField("New Reply added: ", reply)
    .setTimestamp()
    .setColor(config.colour)
    .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    
    bot.guilds.cache.get(process.env.LOGSSERVER).channels.cache.get(process.env.LOGSCHANNEL).send({embeds: [embed]})
  }
}