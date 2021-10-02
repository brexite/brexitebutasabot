const packageJSON = require("../package.json");
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'botinfo',
  aliases: ["version"],
  description: 'Gets information on the bot',
  usage: `botinfo`,
  category: "Util",
  execute: async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`BOT INFO | ${bot.user.username}`, bot.user.avatarURL({ dynamic:true }))
    .addFields(
      { name: 'Bot Version', value: `v${packageJSON.version}`, inline: true },
      { name: 'RAM Usage', value: `${getMemoryUsage()} / 2048MB`, inline: true },
      { name: 'Uptime', value: `${getUptimeString(bot)}`, inline: true },
      { name: 'Author', value: "`brexite`", inline: true },
      { name: 'GitHub', value: `[HERE](https://github.com/brexite/brexitebutasabot)`, inline: true },
      { name: 'Me?', value: `<:willoff:738540171254956064>`, inline: true }
    )
    .setTimestamp()
    .setColor('BLACK')
    .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
    
    message.channel.send({embeds:[embed]})
  }
}

function getMemoryUsage() {
  let total_rss = require('fs').readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8").split("\n").filter(l => l.startsWith("total_rss"))[0].split(" ")[1]; 
  return Math.round( Number(total_rss) / 1e7 );
}

function getUptimeString(bot) {
  let output = ""
  let totalSeconds = (bot.uptime / 1000);

  let days = Math.floor(totalSeconds / 86400);
  days > 0 ? output = `${output}${days}d ` : output = output
  totalSeconds %= 86400;
  
  let hours = Math.floor(totalSeconds / 3600);
  hours > 0 || days > 1 ? output = `${output}${hours}h ` : output = output
  totalSeconds %= 3600;
  
  let minutes = Math.floor(totalSeconds / 60);
  minutes > 0 || days > 1 ? output = `${output}${minutes}m ` : output = output
  let seconds = Math.floor(totalSeconds % 60);

  output = `${output}${seconds}s `

  return output;
}