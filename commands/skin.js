module.exports = {
	name: "skin",
	description: "Finds your minecraft skin on mine.ly",
	usage: "<username>",
	category: "Game",
  args: true,
  execute: async (bot, message, args) => {
    
    const Discord = require('discord.js')
    const fs = require("fs");
    const path = require("path");
    const certPath = path.join(__dirname, '../assets/footerArray.txt');
    let config = require('../config.json'),
        colour = config.colour;
  
    let username = args.join(" ");

    var text = fs.readFileSync(certPath, "utf-8");
    var footerArray = text.split("\n")

    const embed = new Discord.MessageEmbed()
      .setTitle("https://mine.ly/" + username + ".1")
      .setAuthor(
        "Here is your minecraft skin!",
        "https://cdn.discordapp.com/attachments/612022828782452746/892398497821765652/Grass-Block-600x600.png"
      )
      .setColor(config.colour)
      .setThumbnail("https://minotar.net/avatar/" + username + ".png")
      .setTimestamp()
      .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], message.author.displayAvatarURL({ dynamic:true }));
    message.channel.send({embeds: [embed]});
  }
};
