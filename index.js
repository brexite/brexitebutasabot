//git fetch --all
//git reset --hard origin/master

const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const { prefix, token } = require('./config.json');
const path = require("path");
const certPath = path.join(__dirname, "./txt/footerArray.txt");
const serverPath = path.join(__dirname, "../txt/serverdata.json");
const serverdata = require("./txt/serverdata.json");
const text = fs.readFileSync(certPath, "utf-8");
const replyArray = text.split("\n");

app.get("/", (request, response) => {
    // console.log(Date.now() + "Ping Received");
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);


bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`${file} loaded!`);
	bot.commands.set(command.name, command);
}

bot.on("ready", async () => {
    bot.user.setStatus("available");
    bot.user.setPresence({
      game: {
        name: "bro im driving",
        type: "STREAMING",
        url: "https://www.twitch.tv/brexite"
      }
    });
  
    console.log(bot.user.username + " is online.");
  });

bot.on('message', message => {
    
    if (message.channel.type === "dm") {
        message.author.send(
          replyArray[Math.floor(Math.random() * replyArray.length)]
        );
        return;
      }

    if (!serverdata[message.guild.id]) {
        serverdata[message.guild.id] = {
          whitelist: []
        };
    }  

	if (message.author.bot) return;

    if (message.channel.id == "696714277272158319" && message.author.id == "172002275412279296") message.react('711047218575966219');
  
    if (message.content == "bruh") {
      try {
        message.react('711047218575966219');
      } catch (err) {
        console.log("ah ive lost the fucking emoji sorry")
      }
    }
    
    if ((message.content.startsWith("im doing") || message.content.startsWith("i'm doing"))) {
      let content = message.content.split(" ");
      var urmom = content;
      urmom.splice(1, 1);
      if (urmom.length <= 1 || message.content.toLowerCase().includes('HTTP'.toLowerCase())) return;

      message.channel.send(urmom.join(" "));
    }
    
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command = bot.commands.get(commandName)
       || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	  if (!command) return;

    if (
        serverdata[message.guild.id].whitelist.includes(message.channel.id) ||
        message.member.hasPermission('KICK_MEMBERS') ||
        message.member.id == bot.ownerID
    ){

        if (command.args && !args.length) {
    		let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.usage}\``;
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
bot.login(token);