const fs = require('fs');
const Discord = require('discord.js');
const { Permissions } = require('discord.js');
const express = require("express");

const replyJSON = require("./assets/replyArray.json");
const replyArray = replyJSON["replies"];

const serverData = require("./assets/serverdata.json");

require('dotenv').config();

const app = express();
const bot = new Discord.Client({  
  partials: ["CHANNEL"], 
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "DIRECT_MESSAGES"], 
  disableMentions: 'everyone' 
});

//ENV
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const botonChannel = process.env.BOTONCHANNEL;
const logsServer = process.env.LOGSSERVER;
const botOwnerId = process.env.BOTOWNERID

//CMD LOADING
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`${file} loaded!`);
  bot.commands.set(command.name, command);
}

// INIT
bot.on("ready", async () => {
  console.log(bot.user.username + " is online.");
  bot.guilds.cache.get(logsServer).channels.cache.get(botonChannel)
    .send(`**[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} UTC]** - BOT ONLINE.`)

  bot.user.setPresence({
    status: "online",
    activities: [{
      name: "LIQUIDATE COMPANY SIM",
      type: "PLAYING"
    }]
  });
});

//VC Chat Role
bot.on('voiceStateUpdate', (oldState, newState) => {
  if(newState.channel && serverData[newState.guild.id].vcRole.length > 0) {
    let role = newState.guild.roles.cache.find(role => role.id == serverData[newState.guild.id].vcRole);
    newState.member.roles.add(role).catch("Unable to find role");
  }
  else if (oldState.channel && serverData[oldState.guild.id].vcRole.length > 0){
    let role = oldState.guild.roles.cache.find(role => role.id == serverData[oldState.guild.id].vcRole);
    oldState.member.roles.remove(role).catch("Unable to find role");
  }
})

//MSG Catch
bot.on('messageCreate', message => {

  if (message.author.bot) return;

  if (message.channel.type === "DM") {
    try {
      message.author.send(replyArray[Math.floor(Math.random() * replyArray.length)])
    } catch {
      console.error;
    };
    return;
  }

  if (!serverData[message.guild.id]) {
    serverData[message.guild.id] = {
      vcChannel:[],
      vcRole:[]
    };
  } 

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName)
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  funnyMessage(message);

  if (!command || !message.content.startsWith(prefix)) return;

  //if (
    //message.member.permission.has(Permission.FLAGS.KICK_MEMBERS) ||
    //message.member.id == bot.ownerID
  //) {

    if(command.category === "Admin" && !message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return message.reply("You don't have permissions to use this command - Moderators + Admins Only")
      .then(msg => {
        setTimeout(() => msg.delete(), 10000)
        setTimeout(() => message.delete(), 10000)
      })
      .catch(console.error);
    }

    if(command.category === "Bot Owner" && message.member.id != botOwnerId) {
      return message.reply("You don't have permissions to use this command - Bot Owners Only")
      .then(msg => {
        setTimeout(() => msg.delete(), 10000)
        setTimeout(() => message.delete(), 10000)
      })
      .catch(console.error);
    }
    
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.reply(reply)
      .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      .catch(console.error);
    }

    try {
      command.execute(bot, message, args);
    } catch (error) {
      console.error(error);
      message.reply('ah ive lost the fucking command sorry');
    }
  }
//}
);

//IM DOING STUFF
function funnyMessage(commandMessage) {
  if (commandMessage.content == "bruh") commandMessage.react('891716288576122910');

  if ((commandMessage.content.startsWith("im doing") || commandMessage.content.startsWith("i'm doing"))) {
    var urmom = commandMessage.content;
    urmom = urmom.replace("doing ", "");;
    if (urmom.length <= 1 || commandMessage.content.toLowerCase().includes('HTTP'.toLowerCase())) return;

    commandMessage.channel.send(urmom);
  }
};

bot.login(token);