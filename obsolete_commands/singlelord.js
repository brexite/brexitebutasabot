module.exports = {
	name: "singlelord",
	description: "Lord Selection debug command (depreciated)",
	usage: "singlelord",
	category: "Admin",
  execute: async (bot, message, args) => {
    const Discord = require('discord.js')
    const fs = require("fs");
    const path = require("path");
    const lordPath = path.join(__dirname, '../assets/humanevolution.txt');
    let config = require('../config.json'),
        colour = config.colour;

    var lord = fs.readFileSync(lordPath, "utf-8");
    var lordArray = lord.split("\n");
    var guild = message.guild;

    let lordSelection = message.guild.roles.get('696684182218473522').members.map(m=>m.user);

    lordArray = lordArray.slice(Math.max(lordArray.length - 24, 0))

    if(message.member.hasPermission('KICK_MEMBERS')){

      var user = lordSelection[Math.floor(Math.random()*lordSelection.length)]

      while (lordArray.includes(`${user.id}`) || guild.members.get(`${user.id}`).hasPermission('KICK_MEMBERS')) {
        user = lordSelection[Math.floor(Math.random()*lordSelection.length)]  
      }


        const embed = new Discord.RichEmbed()
        .setTitle("Random Lord")
        .setAuthor(
          "brexite but as a bot"
        )
        .setColor(config.colour)
        .addField('And your lord is',
          `${user}`)
        .setTimestamp()
        .setThumbnail(`${user.avatarURL}`)
        .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
        
        message.channel.send({ embed });
    } else {
      return;
    }
  }
};
