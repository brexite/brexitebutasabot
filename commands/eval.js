module.exports = {
  name: "eval",
  description: "Run code in discord",
  aliases: ["run"],
  usage: "<args>",
  category: "Bot Owner",
  args: true,
  execute: async (bot, message, args) => {
    const Discord = require("discord.js");
    let config = require("../config.json"),
      colour = config.colour;

    const path = require("path");
    const fs = require("fs");
    var footerArray = fs.readFileSync(path.join(__dirname, '../assets/footerArray.txt'), "utf-8").split("\n")

    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };

    if (config.ownerID.includes(message.member.id)) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        let embed = new Discord.MessageEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Output", `\`\`\`${clean(evaled)}\`\`\``)
          .setColor(colour)
          .setTimestamp()
          .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], message.author.displayAvatarURL({ dynamic:true }));

        message.channel.send({embeds: [embed]});
      } catch (err) {
        let embed = new Discord.MessageEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
          .setColor(colour)
          .setTimestamp()
          .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], message.author.displayAvatarURL({ dynamic:true }));

        message.channel.send({embeds: [embed]});
      }
    }
  }
};