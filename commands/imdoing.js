const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverData = require("../assets/serverdata.json");
require('dotenv').config();

module.exports = {
  name: 'imdoing',
  aliases: ["doing"],
  description: `Enables or disables the "im doing x"/"im x" reply behaviour server-wide`,
  usage: `imdoing <enable/disable/info>`,
  category: "Admin",
  args: true,
  execute: async (bot, message, args) => {

    if (args[0]) {

      JSON.parse(fs.readFileSync(serverPath, "utf8"));
      const action = args[0];

      switch (action) {
        case "enable":
          if(serverData[message.guild.id].imDoingFeature){
            message.reply("I'm Doing Stuff is already enabled!")
            break;
          }
          serverData[message.guild.id].imDoingFeature = true;
            fs.writeFile(
              serverPath,
              JSON.stringify(serverData, null, "\t"),
              err => {
                console.error(err);
              }
            );
            message.reply("I'm Doing Stuff is enabled! Try saying ''I'm Doing Stuff'' and see what happens!");
          break;

        case "disable":
          if(!serverData[message.guild.id].imDoingFeature){
            message.reply("I'm Doing Stuff is already disabled!")
            break;
          }
            serverData[message.guild.id].imDoingFeature = false;
            fs.writeFile(
              serverPath,
              JSON.stringify(serverData, null, "\t"),
              err => {
                console.error(err);
              }
            );
            message.reply("I'm Doing Stuff is disabled!");
          break;
        case "info":
              message.reply(`I'm Doing Stuff is currently ${serverData[message.guild.id].imDoingFeature ? "**Enabled**" : "**Disabled**"} for this server.`)
          break;
      }
    }
  }
}