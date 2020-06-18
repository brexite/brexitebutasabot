const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, '../txt/footerArray.txt');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let username = args.join(" ");

  var text = fs.readFileSync(certPath, "utf-8");
  var footerArray = text.split("\n")
  
  const embed = new Discord.RichEmbed()
    .setTitle("yo heres some shit help")
    .setAuthor(
      "brexite but as a bot"
    )
    .setColor(config.colour)
    .addField('__'+config.prefix+'help__',
      'See '+config.prefix+'help')
    .addField('__'+config.prefix+'nospam__',
      'Easy way to stop people spamming')
    .addField('__'+config.prefix+'p__',
      'P')
    .addField('__'+config.prefix+'poke__',
      'Bot doesn\'t like it when you do that')
    .addField('__'+config.prefix+'skin <MC Name>__',
      'Finds a user\'s Minecraft skin')
    .addField('__'+config.prefix+'spamcfg <filename> <long ass text>__',
      'Creates a text spam config file from your input')
    .addField('__'+config.prefix+'suggestion <text>__',
      'Send me suggestions and funny quirky gifs to add to the bot')
    .addField('__'+config.prefix+'vote <optional_duration> <question>?__',
      'Creates a poll (default length 20s/ max length 1d)')
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/attachments/354594007873224704/687775881464250387/maxresdefault_2.jpg")
    .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png");
  
  const staffembed = new Discord.RichEmbed()
    if (message.guild.id == "696515024746709003" || message.member.id == config.ownerID){
      staffembed.addField('__'+config.prefix+'lord__',
      'Generates 3 lords for use in House of Lords')
      staffembed.addField('__'+config.prefix+'singlelord__',
      'Generates a single lord for use in House of Lord (Depreciated)')
    }
  
    staffembed.setTitle("more crap help")
    .setAuthor(
      "brexite but as a bot"
    )
    .setColor(config.colour)
    .addField('__'+config.prefix+'whitelist <add | remove | del | list> <optional channel ID | "all">__',
      'Adds or removes the channel you are in, or as specified to the whitelist, or shows the current whlitelist (Kick perms will override)')
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/attachments/354594007873224704/687775881464250387/maxresdefault_2.jpg")
    .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png");
    
  
  message.channel.send({ embed });
  if (message.member.hasPermission('KICK_MEMBERS') || message.member.id == config.ownerID) {
    message.channel.send({ embed: staffembed });
  }
}
//name this whatever the command name is.
module.exports.help = {
  name: "help"
}
