const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverdata = require("../assets/serverdata.json");
require('dotenv').config();

module.exports = {
  name: 'vcrole',
  aliases: ["vcchat"],
  description: 'Sets a role to be used in VC chat',
  usage: `vcrole <set | del> <role | channel> OR ${process.env.PREFIX}vcrole <info>`,
  category: "Admin",
  args: true,
  execute: async (bot, message, args) => {

    if (args[0]) {
      var vcRole = serverdata[message.guild.id].vcRole;
      var vcChannel = serverdata[message.guild.id].vcChannel;

      JSON.parse(fs.readFileSync(serverPath, "utf8"));
      const action = args[0];

      switch (action) {
        case "set":
        case "add":
          if (args[1] == "role") {
            try {
              var thisRole = args[2];
            } catch {
              message.channel.send("Error: No role specified");
            }
            if (!thisRole) {
              break;
            }
            if (vcRole.includes(thisRole)) {
              message.channel.send("Error: Role already added");
            } else {
              vcRole.push(thisRole);
              fs.writeFile(
                serverPath,
                JSON.stringify(serverdata, null, "\t"),
                err => {
                  console.error(err);
                }
              );
              message.channel.send("Success!");
            }
          }
          else if (args[1] == "channel") {
            try {
              var thisChannel = args[2];
            } catch {
              message.channel.send("Error: No channel specified");
            }
            if (!thisChannel) {
              break;
            }
            if (vcChannel) {
              message.channel.send("Error: Channel already added");
            } else {
              vcChannel.push(thisChannel);
              fs.writeFile(
                serverPath,
                JSON.stringify(serverdata, null, "\t"),
                err => {
                  console.error(err);
                }
              );
              message.channel.send("Success!");
            }
          } else {
            message.channel.send("Please specify channel or role");
          }
          break;

        case "delete":
        case "remove":
        case "del":
          if (args[1] == "role") {
            if (vcRole.length > 0) {
              vcRole.shift();
              fs.writeFile(
                serverPath,
                JSON.stringify(serverdata, null, "\t"),
                err => {
                  console.error(err);
                }
              );
              message.channel.send("Success!");
            } else {
              message.channel.send("Error: No role exists");
            }
          }
          else if (args[1] == "channel") {
            if (vcChannel.length > 0) {
              vcChannel.shift();
              fs.writeFile(
                serverPath,
                JSON.stringify(serverdata, null, "\t"),
                err => {
                  console.error(err);
                }
              );
              message.channel.send("Success!");
            } else {
              message.channel.send("Error: No channel exists");
            }
          } else {
            message.channel.send("Please specify channel or role");
          }
          break;
        case "info":

          break;
      }
    }
  }
}