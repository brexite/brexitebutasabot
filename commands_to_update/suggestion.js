module.exports = {
	name: "suggestion",
	aliases: ["suggestions"],
	description: "Sends a suggestion to the bot creator",
	usage: "suggestion <text>",
	category: "Util",
  args: true,
  execute: async (bot, message, args) => {
  //this is where the actual code for the command goes
  const Discord = require('discord.js')
  let config = require("../config.json")

  let suggestion = args.slice(0).join(" ");

  let embed = new Discord.RichEmbed()
  .addField("Suggestion", suggestion)
  .setTimestamp()
  .setColor(config.colour)
  .setFooter(message.member.user.tag + " | " + message.guild.name, bot.user.avatarURL);
  
     bot.guilds.get(config.logsServer).channels.get("723404124955213854").send({ embed })
    
  message.channel.send("thats cool mate cheers");
  }
};
