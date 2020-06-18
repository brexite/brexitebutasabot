const Discord = require('discord.js')
const fs = require("fs");
const path = require("path");
const certPath = path.join(__dirname, "../txt/footerArray.txt");
const serverPath = path.join(__dirname, "../txt/serverdata.json");

var text = fs.readFileSync(certPath, "utf-8");
var footerArray = text.split("\n"); // txt output of footerArray.txt
let config = require('../config.json'),
    colour = config.colour;
const serverdata = require("../txt/serverdata.json");

module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  if (message.member.hasPermission("KICK_MEMBERS")) {
    JSON.parse(fs.readFileSync(serverPath, "utf8"));

    const action = args[0];
    var channelid = args[1];

    if (channelid === undefined){
      channelid = message.channel.id;
    } else if (channelid.startsWith('<#') && channelid.endsWith('>')){
      channelid = channelid.slice(2, -1);
    } else if (channelid == "all") {
      console.log("all has been spoken")
    } else if (message.guild.channels.exists('name', channelid)) {
      console.log("lording")
      channelid = message.guild.channels.find('name', channelid).id
    } else {
      console.log("not pog")
    }

    console.log("channel tag" + channelid)

    if (!message.guild.channels.map(m => m.id).includes(channelid) && channelid != "all") {
      console.log("FAKE");
      return;
    }

    var whitelist = serverdata[message.guild.id].whitelist;

    var allChannels = [];
        let channels = message.guild.channels;
        for (const channel of channels.values()) 
        {
          allChannels.push(channel.id);
        }

    switch (action) {
      case 'add':
        if (channelid == "all") {
          console.log("all")
          whitelist.splice(0, whitelist.length);
          let channels = message.guild.channels;
          for (const channel of channels.values()) 
          {
            whitelist.push(channel.id);
          }
          fs.writeFile(serverPath, JSON.stringify(serverdata), (err) => {
            if (err) console.error(err)
          })
          message.channel.send("All channels added to whitelist!")
        } else if (whitelist.includes(channelid)){
          console.log("already here")
          message.channel.send("Error: Channel is already whitelist")
        } else {
          console.log("added")
          whitelist.push(channelid);
          fs.writeFile(serverPath, JSON.stringify(serverdata), (err) => {
            if (err) console.error(err)
          });
          message.channel.send("<#"+ channelid + "> added to whitelist!")
        }
        break;
      case 'delete':
      case 'remove':
      case 'del':

        const index = whitelist.indexOf(channelid);
        if (channelid == "all") {
          console.log("all")          whitelist.splice(0, whitelist.length);
          fs.writeFile(serverPath, JSON.stringify(serverdata), (err) => {
            if (err) console.error(err)
          })
          message.channel.send("All channels removed from whitelist!")
        } else if (index > -1) {
          whitelist.splice(index, 1);
          console.log("removed")
          fs.writeFile(serverPath, JSON.stringify(serverdata), (err) => {
            if (err) console.error(err)
          });
          message.channel.send("<#"+ channelid + "> removed from whitelist!")
        } else {
          console.log("not here")
          message.channel.send("Error: Channel is not whitelisted")
        }

        break;
      case 'list':

        var names = [];
        for (var i = 0; whitelist.length > i; i++) {
          names[i] = JSON.stringify(message.guild.channels.get(whitelist[i]).id);
          names[i] = names[i].slice(1, -1);
        }

        const embed = new Discord.RichEmbed()
        .setTitle("Random Lord")
        .setAuthor(
          "brexite but as a bot"
        )
        .setColor(config.colour)

        var open = " "
        var closed = " ";

        for(var j = 0; allChannels.length > j; j++) {
          if (names.includes(allChannels[j])){
            open += "`" + message.guild.channels.get(allChannels[j]).name + "` "
          } else {
            closed += "`" + message.guild.channels.get(allChannels[j]).name + "` "
          }
        }

        try {embed.addField("🚫 Blocked Channels", closed, true)} 
        catch (err) {embed.addField("🚫 Blocked Channels", "<No Blocked Channels>", true)}

        try {embed.addField("✅ Whitelisted", open, true)}
        catch (err) {embed.addField("✅ Whitelisted", "<No Whitelisted Channels>", true)}
        embed.setTimestamp()
        .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png");
        message.channel.send({ embed });
      break;
      default: message.channel.send("you utter muppet, you absolute buffoon, enter a valid command")
    }
  }
}
//name this whatever the command name is.
module.exports.help = {
  name: "whitelist"
}