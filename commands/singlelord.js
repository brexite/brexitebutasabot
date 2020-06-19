module.exports = {
	name: "singlelord",
	description: "Lord Selection debug command (depreciated)",
	usage: "singlelord",
	category: "Admin",
};

module.exports.execute = async (bot, message, args) => {
    const Discord = require('discord.js')
    const fs = require("fs");
    const path = require("path");
    const certPath = path.join(__dirname, "../txt/footerArray.txt");
    const lordPath = path.join(__dirname, '../txt/humanevolution.txt');
    let config = require('../config.json'),
        colour = config.colour;

    var text = fs.readFileSync(certPath, "utf-8");
    var lord = fs.readFileSync(lordPath, "utf-8");
    var footerArray = text.split("\n");
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
        .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png");
        message.channel.send({ embed });
    } else {
      return;
    }
};
