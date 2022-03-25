const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports = {
  name: "eval",
  description: "Run code in discord",
  aliases: ["run"],
  usage: "eval <args>",
  category: "Bot Owner",
  args: true,
  execute: async (bot, message, args) => {

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
          .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
        message.reply({embeds: [embed]});
      } catch (err) {
        let embed = new Discord.MessageEmbed()
          .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
          .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
          .setColor(colour)
          .setTimestamp()
          .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));

        message.reply({embeds: [embed]});
      }
    }
  }
};
