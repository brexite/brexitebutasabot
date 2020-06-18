//git fetch --all
//git reset --hard origin/master

const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const certPath = path.join(__dirname, "./txt/footerArray.txt");
const client = new Discord.Client();
const serverPath = path.join(__dirname, "../txt/serverdata.json");
const serverdata = require("./txt/serverdata.json");

app.get("/", (request, response) => {
  // console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var text = fs.readFileSync(certPath, "utf-8");
var replyArray = text.split("\n");
var nitroArray = ["140175075314892800","306104099185623042","298055278711144449"]

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

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


bot.on("message", async message => {
  
  //a little bit of data parsing/general checks
  if (message.author.bot) return;
  
  // if (message.author.id == "678379794563596318" && nitroArray.includes(message.mentions.users.first().id)) {
  //     message.delete();    // Nitro ping script
  //     message.channel.send("suck a cock nitro");
  //   }
  
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
    
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;
  
    if (message.channel.id == "696714277272158319" && message.author.id == "172002275412279296") message.react('711047218575966219');
  
    if (message.content == "bruh") message.react('711047218575966219');
    
    if ((message.content.startsWith("im doing") || message.content.startsWith("i'm doing"))) {
      var urmom = content;
      urmom.splice(1, 1);
      if (urmom.length <= 1 || message.content.toLowerCase().includes('HTTP'.toLowerCase())) return;
      message.channel.send(urmom.join(" "));
    }

    //checks if message contains a command and runs it
    if (!message.content.startsWith(prefix)) return;
    
    if (
    serverdata[message.guild.id].whitelist.includes(message.channel.id) ||
    message.member.hasPermission('KICK_MEMBERS') ||
    message.member.id == config.ownerID
    ){
      
      let commandfile = bot.commands.get(command.slice(prefix.length));
      if (commandfile) commandfile.run(bot, message, args);
      
    } else {
      return;
    }
});

bot.login(config.token);
