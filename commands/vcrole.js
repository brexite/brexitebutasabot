module.exports = {
  name: 'vcrole',
  description: 'Sets a role to be used in VC chat - Use this command in the VC channel required',
  usage: '<deleteChannel | deleteRole | info | setChannel | setRole>',
  category: "Util",
  execute: async (bot, message, args) => {

    const fs = require("fs");
    const path = require("path");
    const serverPath = path.join(__dirname, "../assets/serverdata.json");
    const serverdata = require("../assets/serverdata.json");

    if (args[0]) {
      var vcRole = serverdata[message.guild.id].vcRole;
      var vcChannel = serverdata[message.guild.id].vcChannel;

      JSON.parse(fs.readFileSync(serverPath, "utf8"));
      const action = args[0];

      switch (action) {
        case "setRole":
          try {
            var thisRole = args[1];
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
          break;

        case "setChannel":
          try {
            var thisChannel = args[1];
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
          break;

        case "deleteChannel":
        case "removeChannel":
        case "delChannel":
          if (vcChannel.length() > 0) {
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
          break;
        case "deleteRole":
        case "removeRole":
        case "delRole":
          if (vcRole.length() > 0) {
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
            message.channel.send("Error: No channel exists");
          }
          break;
        case "list":

          break;
      }
    }
  }
}