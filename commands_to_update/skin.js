module.exports = {
	name: "skin",
	description: "Finds your minecraft skin on mine.ly",
	usage: "skin <username>",
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


    const embed = new Discord.RichEmbed()
      .setTitle("https://mine.ly/" + username + ".1")
      .setAuthor(
        "brexite but as a bot",
        "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png"
      )
      .setColor(config.colour)
      .setThumbnail("https://minotar.net/avatar/" + username + ".png")
      .setTimestamp()
      .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)]);
    message.channel.send({ embed });
  }
};
