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
  const { Permissions } = require('discord.js');
  let config = require("../config.json")
  const fs = require("fs");
  const path = require("path");
  const replyPath = path.join(__dirname, "../assets/replyArray.txt");

    console.log(bot.user.displayAvatarURL);
  
  if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !config.ownerID.includes(message.member.id)) return;

  let reply = args.slice(0).join(" ");

  var text = fs.readFileSync(replyPath, "utf-8");
  var replyArray = text.split("\n")

  let embed = new Discord.MessageEmbed()
  .setAuthor("Reply #" + String(replyArray.length - 1), bot.user.avatarURL({ dynamic:true }))
  .addField("New Reply added: ", reply)
  .setTimestamp()
  .setColor(config.colour)
  .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
  
  bot.guilds.cache.get(config.logsServer).channels.cache.get("723404124955213854").send({embeds: [embed]})
    
  fs.appendFile(replyPath, reply + "\n", err => {
    if (err) throw err;
  });
    
  message.channel.send("thats cool mate cheers");
  }
};
