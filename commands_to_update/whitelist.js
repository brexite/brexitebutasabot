module.exports = {
	name: "whitelist",
	description: "For adding and removing channels to the whitelist",
	usage: "whitelist <add | remove | del | list> <channel ID | all>",
	category: "Admin",
  args: true,
  execute: async (bot, message, args) => {
  //this is where the actual code for the command goes
  
    const Discord = require('discord.js')
    const fs = require("fs");
    const path = require("path");

      let config = require('../config.json'),
        colour = config.colour;
    const serverPath = path.join(__dirname, "../assets/serverdata.json");
    const serverdata = require("../assets/serverdata.json");
      if (message.member.hasPermission("KICK_MEMBERS") || config.ownerID.includes(message.member.id)) {
        JSON.parse(fs.readFileSync(serverPath, "utf8"));

      const action = args[0];
      var channelid = args[1];

      if (channelid === undefined){
        channelid = message.channel.id;
      } else if (channelid.startsWith('<#') && channelid.endsWith('>')){
        channelid = channelid.slice(2, -1);
      } else if (channelid == "all") {
      } else if (message.guild.channels.exists('name', channelid)) {
        channelid = message.guild.channels.find('name', channelid).id
      } else {
      }
      
      if (!message.guild.channels.map(m => m.id).includes(channelid) && channelid != "all") {
        return;
      }

      var whitelist = serverdata[message.guild.id].whitelist;

      var allChannels = [];
          let channels = message.guild.channels;
          for (const channel of channels.values()) 
          {
            if(channel.type === 'text') allChannels.push(channel.id);
          }

      switch (action) {
        case 'add':
          if (channelid == "all") {
            whitelist.splice(0, whitelist.length);
            let channels = message.guild.channels;
            for (const channel of channels.values()) 
            {
              whitelist.push(channel.id);
            }
            fs.writeFile(serverPath, JSON.stringify(serverdata, null, "\t"), (err) => {
              if (err) console.error(err)
            })
            message.channel.send("All channels added to whitelist!")
          } else if (whitelist.includes(channelid)){
            message.channel.send("Error: Channel is already whitelist")
          } else {
            whitelist.push(channelid);
            fs.writeFile(serverPath, JSON.stringify(serverdata, null, "\t"), (err) => {
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
            whitelist.splice(0, whitelist.length);
            fs.writeFile(serverPath, JSON.stringify(serverdata, null, "\t"), (err) => {
              if (err) console.error(err)
            })
            message.channel.send("All channels removed from whitelist!")
          } else if (index > -1) {
            whitelist.splice(index, 1);
            fs.writeFile(serverPath, JSON.stringify(serverdata, null, "\t"), (err) => {
              if (err) console.error(err)
            });
            message.channel.send("<#"+ channelid + "> removed from whitelist!")
          } else {
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
          .setTitle("Server Whitelist")
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
          .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));
          message.channel.send({ embed });
        break;
        default: message.channel.send("you utter muppet, you absolute buffoon, enter a valid command")
      }
    }
  }
};