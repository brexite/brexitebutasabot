module.exports = {
	name: "suggestion",
	aliases: ["suggestions"],
	description: "Sends a suggestion to the bot creator",
	usage: "suggestion <text>",
	category: "Util",
  args: true,
};

module.exports.execute = async (bot, message, args) => {
  //this is where the actual code for the command goes
    const Discord = require('discord.js')
  const fs = require("fs");
  const path = require("path");
  const certPath = path.join(__dirname, '../txt/log.txt');

  let suggestion = args.slice(0).join(" ");

  fs.appendFile(certPath, "\n" + suggestion, (err) => {
    if (err) throw err;
  });

    message.channel.send("thats cool mate cheers");
};
