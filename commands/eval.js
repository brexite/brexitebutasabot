module.exports = {
  name: "eval",
  description: "Run code in discord",
  aliases: ["run"],
  usage: "eval <args>",
  category: "Bot Owner",
  execute: async (bot, message, args) => {
    const Discord = require("discord.js");
    let config = require("../config.json"),
      colour = config.colour;
    const db = require("quick.db");

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

        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Output", `\`\`\`${clean(evaled)}\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      } catch (err) {
        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      }
    }

    if (message.author.id === config.ownerID2) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Output", `\`\`\`${clean(evaled)}\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      } catch (err) {
        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      }
    }

    if (message.author.id === config.ownerID3) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Output", `\`\`\`${clean(evaled)}\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      } catch (err) {
        let embed = new Discord.RichEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
          .setColor(colour);

        message.channel.send(embed);
      }
    }
  }
};
