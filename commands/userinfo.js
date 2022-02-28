const Discord = require('discord.js')
let config = require('../config.json')
    
module.exports = {
	name: "userinfo",
  aliases: ['info','user','whois'],
	description: "Returns information about the user",
	usage: "userinfo (user-mention)",
	category: "Util",
  execute: async (bot, message, args) => {
    
    //emojis
    const willoff = "<:willoff:738540171254956064>";
    let member = message.mentions.members.first() || message.member,
    user = member.user;
    let botCheck = !!user.bot ? "✅" : "❌";

    var userCreated = new Date(user.createdTimestamp)
    userCreated = userCreated.toUTCString()
    
    var userJoinedGuild = new Date(member.joinedTimestamp)    
    userJoinedGuild = userJoinedGuild.toUTCString()

    const embed = new Discord.MessageEmbed()
      .setTitle(user.tag)
      .setColor(config.colour)
      .setThumbnail(user.avatarURL({ dynamic:true }))
      .setDescription([
        `${willoff}` + "**Nickname:** "+ member.displayName,
        `${willoff}` + "**ID:** `"+ member.id+"`",
        `${willoff}` + `**Joined Guild:** ${userJoinedGuild}`,
        `${willoff}` + `**Joined Discord:** ${userCreated}`,
        "‎",
        `${willoff}` + "**Bot:** " + botCheck,
        `${willoff}` + "**Roles:** " + member.roles.cache.map(r => `${r}`).join(' | ')
      ].join("\n"));
    
      embed.setTimestamp()
      .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    message.channel.send({embeds: [embed]});
  }
};
