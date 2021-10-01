module.exports = {
	name: "userinfo",
  aliases: ['info','user','whois'],
	description: "Returns information about the user",
	usage: "userinfo",
	category: "Util",
  execute: async (bot, message, args) => {
    
    const Discord = require('discord.js')
    let config = require('../config.json')
    
    //emojis
    const willoff = "<:willoff:738540171254956064>";
    
    let member = message.mentions.members.first() || message.member,
    user = member.user;
    
    var botCheck
    if (user.bot == true) {
      botCheck = "✅"
    } else {
      botCheck = "❌"
    }

    var d = new Date(user.createdTimestamp)
    d = d.toString().split(" GMT")[0]
    
    var e = new Date(member.joinedTimestamp)    
    e = e.toString().split(" GMT")[0]

    const embed = new Discord.MessageEmbed()
      .setTitle(user.tag)
      .setColor(config.colour)
      .setThumbnail(user.avatarURL({ dynamic:true }))
      .setDescription([
        `${willoff}` + "**Nickname:** "+ member.displayName,
        `${willoff}` + "**ID:** `"+ member.id+"`",
        `${willoff}` + "**Joined Guild:**  "+ e + " (UTC)",
        `${willoff}` + "**Joined Discord:** " + d + " (UTC)",
        "‎",
        `${willoff}` + "**Bot:** " + botCheck,
        `${willoff}` + "**Roles:** " + member.roles.cache.map(r => `${r}`).join(' | ')
      ].join("\n"));
    
      embed.setTimestamp()
      .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    message.channel.send({embeds: [embed]});
  }
};
