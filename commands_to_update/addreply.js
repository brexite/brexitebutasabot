module.exports = {
	name: "addreply",
	aliases: [""],
	description: "Adds a reply to the replyArray",
	usage: "addreply <text>",
	category: "Admin",
  args: true,
  execute: async (bot, message, args) => {
  //this is where the actual code for the command goes
  const Discord = require('discord.js')
  let config = require("../config.json")
  const fs = require("fs");
  const path = require("path");
  const replyPath = path.join(__dirname, "../txt/replyArray.txt");
  
  if (!message.member.hasPermission("KICK_MEMBERS") && !config.ownerID.includes(message.member.id)) return;

  let reply = args.slice(0).join(" ");

  let embed = new Discord.RichEmbed()
  .addField("New Reply added: ", reply)
  .setTimestamp()
  .setColor(config.colour)
  .setFooter(message.member.user.tag + " | " + message.guild.name, bot.user.avatarURL);
  
     bot.guilds.get(config.logsServer).channels.get("723404124955213854").send({ embed })
    
  fs.appendFile(replyPath, "\n" + reply, err => {
    if (err) throw err;
  });
    
  message.channel.send("thats cool mate cheers");
  }
};
