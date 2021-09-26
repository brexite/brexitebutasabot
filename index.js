const fs = require('fs');
const Discord = require('discord.js');
const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const bot = new Discord.Client({ disableMentions: 'everyone' });

const text = fs.readFileSync(path.join(__dirname, "./resources/replyArray.txt"), "utf-8");
const replyArray = text.split("\n");

//ENV
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`${file} loaded!`);
  bot.commands.set(command.name, command);
}

bot.on("ready", async () => {
  console.log(bot.user.username + " is online.");
  bot.user.setPresence({
    status: "online",
    activity: {
      name: "BUY APPLE SHARES",
      type: "PLAYING"
    }
  });
});

bot.on('message', message => {

  if (message.channel.type === "dm") {
    message.author.send(
      replyArray[Math.floor(Math.random() * replyArray.length)]
    );
    return;
  }

  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName)
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  funnyMessage(message);

  if (!command || !message.content.startsWith(prefix)) return;

  if (
    message.member.hasPermission('KICK_MEMBERS') ||
    message.member.id == bot.ownerID
  ) {

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    try {
      command.execute(bot, message, args);
    } catch (error) {
      console.error(error);
      message.reply('ah ive lost the fucking command sorry');
    }
  }
});

function funnyMessage(commandMessage) {
  if (commandMessage.content == "bruh") message.react('891716288576122910');

  if ((commandMessage.content.startsWith("im doing") || commandMessage.content.startsWith("i'm doing"))) {
    var urmom = commandMessage.content;
    urmom = urmom.replace("doing ", "");;
    if (urmom.length <= 1 || commandMessage.content.toLowerCase().includes('HTTP'.toLowerCase())) return;

    commandMessage.channel.send(urmom);
  }
};

bot.login(token);