const Discord = require('discord.js')
let config = require("../config.json")

module.exports = {
	name: "suggestion",
	aliases: ["suggestions"],
	description: "Sends a suggestion to the bot creator",
	usage: "suggestion <text>",
	category: "Util",
  args: true,
  execute: async (bot, message, args) => {
    //this is where the actual code for the command goes

    let suggestion = args.slice(0).join(" ");

    let embed = new Discord.MessageEmbed()
    .setAuthor("NEW SUGGESTION", bot.user.avatarURL({ dynamic:true }))
    .addField("Suggestion:",suggestion)
    .setTimestamp()
    .setColor('GREEN')
    .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    
    bot.guilds.cache.get(process.env.LOGSSERVER).channels.cache.get(process.env.LOGSCHANNEL).send({embeds: [embed]})
      
    message.channel.send("thats cool mate cheers");
  }
};
