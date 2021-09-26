module.exports = {
  name: "lord",
  description: "Picks the Lord of the Week [currently only for Podel Server]",
  usage: "lord (blacklist) (add | remove | list) (tag)",
  category: "Admin"
};

module.exports.execute = async (bot, message, args) => {
  const Discord = require("discord.js");
  const fs = require("fs");
  const path = require("path");
  const certPath = path.join(__dirname, "../txt/footerArray.txt");
  const lordPath = path.join(__dirname, "../txt/humanevolution.txt");
  let config = require("../config.json"),
    colour = config.colour;

  var text = fs.readFileSync(certPath, "utf-8");
  var lord = fs.readFileSync(lordPath, "utf-8");
  var footerArray = text.split("\n"); // txt output of footerArray.txt
  var lordArray = lord.split("\n"); // txt output of humanevolution.txt
  var prevLords = lordArray
  var guild = message.guild;
  var authorID = message.author.id; // unused
  var lordID = []; // Array of chosen lords

  if (
    message.member.hasPermission(
      "KICK_MEMBERS" || config.ownerID.includes(message.member.id)
    )
  ) {
    const serverPath = path.join(__dirname, "../txt/serverdata.json");
    const serverdata = require("../txt/serverdata.json");
    var bannedlords = serverdata[message.guild.id].bannedlords;
    
    if (args[0] == "blacklist") {
      JSON.parse(fs.readFileSync(serverPath, "utf8"));
      const action = args[1];
      switch (action) {
        case "add":
          try {
            var userid =
              message.mentions.members.first().id ||
              message.guild.members.get(args[2]).id;
          } catch {
            message.channel.send("Error: No user specified");
          }
          if (!userid) {
            break;
          }
          if (bannedlords.includes(userid)) {
            message.channel.send("Error: User is already blacklisted");
          } else {
            bannedlords.push(userid);
            fs.writeFile(
              serverPath,
              JSON.stringify(serverdata, null, "\t"),
              err => {
                if (err) console.error(err);
              }
            );
            message.channel.send("<@" + userid + "> added to blacklist!");
          }
          break;
        case "delete":
        case "remove":
        case "del":
          
            try {
              var userid =
                message.mentions.members.first().id ||
                message.guild.members.get(args[2]).id;
            } catch {
              message.channel.send("Error: No user specified");
            }
          if (!userid) {
            break;
          }
          const index = bannedlords.indexOf(userid);
          console.log(index)
          if (index > -1) {
            bannedlords.splice(index, 1);
            fs.writeFile(
              serverPath,
              JSON.stringify(serverdata, null, "\t"),
              err => {
                if (err) console.error(err);
              }
            );
            message.channel.send("<@" + userid + "> removed from blacklist!");
          } else {
            message.channel.send("Error: User is not blacklisted");
          }

          break;
        case "list":
          var ids = [];
          var names = " ";
          for (var i = 0; bannedlords.length > i; i++) {
            ids[i] = JSON.stringify(bannedlords[i]);
            ids[i] = message.guild.members.get(ids[i].slice(1, -1));
            
            names += "`" + ids[i].user.username +"#"+ ids[i].user.discriminator + "` "
            console.log(names)
          }
          

          const embed = new Discord.RichEmbed()
            .setTitle("Server banned lords")
            .setAuthor("brexite but as a bot")
            .setColor(config.colour)
            .addField("People currently blacklisted", names)
            .setTimestamp()
            .setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png")
            
            message.channel.send({ embed });
          break;

        default:
          message.channel.send(
            "you utter muppet, you absolute buffoon, enter a valid command"
          );
      }
      return;
    } else {
      try {
        message.guild
        .roles.get("696684182218473522")
        .members.map(m => m.user)
      } catch {
        message.channel.send ("This isn't a server that can use this command, sorry.")
      }
      
      let lordSelection = message.guild
        // .roles.get("696684182218473522")
        .members.map(m => m.user)

      lordArray = lordArray.slice(Math.max(lordArray.length - 18, 0));
      var i = 0;
      
      
      var ids = [];
        for (var j = 0; bannedlords.length > j; j++) {
          ids[j] = JSON.stringify(bannedlords[j]).slice(1, -1);
        }
      
      ids.push(lordArray);      
      // console.log("ids\n" + ids)

      while (i < 3) {
        var user =
          lordSelection[Math.floor(Math.random() * lordSelection.length)];
        
        var count = 0;

        while (
          (ids.includes(user.id) ||
            guild.members.get(user.id).hasPermission("KICK_MEMBERS")) &&
          count < 25
        ) {
          lordArray.push(user)
          user =
            lordSelection[Math.floor(Math.random() * lordSelection.length)];
          count++;
        }
        // console.log(count)
        // var check = ids.includes(user.id)
        // console.log("Check\n________________\n"+ids[ids.length - 2]+" "+ typeof(ids[ids.length - 2]) + "\n" + user.id+" "+ typeof(user.id)+"\n________________\nIs equal = "+ check)
        if (count >= 24) return console.log("Error finding new lord | Attempt: " + count);
        if (
            ids.includes(user.id) ||
            guild.members.get(user.id).hasPermission("KICK_MEMBERS")
        )
          return message.channel.send("Error finding new lord | Find attempt: " + count);

        lordID.push(`${user.id}`);

        const embed = new Discord.RichEmbed()
          .setTitle("Random Lord")
          .setAuthor("brexite but as a bot")
          .setColor(config.colour)
          .addField("And your lord is", `${user}`)
          .setTimestamp()
          .setThumbnail(`${user.avatarURL}`)
          .setFooter(
            "i have 3 days to live",
            "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png"
          );
        await message.channel.send({ embed });

        i++;
      }

      let lorder = await message.channel.send(
        "Do you wish to make these people lords? (30s)"
      );

      await lorder.react("✅");
      await lorder.react("🚫");

      // Create a reaction collector
      const results = await lorder.awaitReactions(
        reaction =>
          reaction.emoji.name === "✅" || reaction.emoji.name === "🚫",
        { time: 30000 }
      );

      var votesYes = results.get("✅");
      var votesNo = results.get("🚫");

      if (votesYes == undefined) {
        votesYes = 0;
      } else {
        votesYes = results.get("✅").count - 1;
      }

      if (votesNo == undefined) {
        votesNo = 0;
      } else {
        votesNo = results.get("🚫").count - 1;
      }

      if (votesNo == votesYes)
        message.channel.send(
          "Vote inconclusive `[Yes: " + votesYes + " | No: " + votesNo + "]`"
        );
      else if (votesNo > votesYes)
        message.channel.send(
          "Vote failed `[Yes: " + votesYes + " | No: " + votesNo + "]`"
        );
      else if (votesYes < 3)
        message.channel.send(
          "Vote failed (requires 3 to pass) `[Yes: " +
            votesYes +
            " | No: " +
            votesNo +
            "]`"
        );
      else if (votesYes > votesNo) {
        message.channel
          .send("Vote passed! `[Yes: " + votesYes + " | No: " + votesNo + "]`")
          .then(
            guild.channels
              .find(c => c.name === "announcements")
              .send(
                "this week's lords are: <@" +
                  lordID[0] +
                  ">, <@" +
                  lordID[1] +
                  "> and <@" +
                  lordID[2] +
                  "> \n\n please please please consider employment"
              )
          )
          .catch(error =>
            message.channel.send(
              "Announcement failed, template here \n\n `this week's lords are: <@" +
                lordID[0] +
                ">, <@" +
                lordID[1] +
                "> and <@" +
                lordID[2] +
                "> \n\n please please please consider employment`"
            )
          );

        let role = await message.guild.roles.find(
          t => t.name == "House of Lords"
        );

        prevLords = prevLords.slice(-3)
        // console.log("prevlords: " + prevLords)
        await message.guild.members.forEach(member => {
          if (
            member.roles.find(t => t.name == "House of Lords") &&
            !lordID.includes(member.id) && 
            prevLords.includes(member.id)
          ){
          member.removeRole(role.id).then(
              console.log(`Removed role from user ${member.user.tag}!`)
            ).catch(error =>
              message.channel.send(
                "Failed to remove role to <@" + `${member.user.tag}` + ">"
              )
            )}
          
          console.log(`\n-----------------------------${member.user.tag} `)
          // if(member.roles.find(t => t.name == "House of Lords")) console.log(`${member.user.tag} has lord currently`)
          // if(!lordID.includes(member.id)) console.log(`${member.user.tag} hasn't just been picked`)
          // if(prevLords.includes(member.id)) console.log(`${member.user.tag} is in the last 3 lords`)
          
        });

        var i = 0;
        while (i < lordID.length) {
          await message.guild.fetchMember(lordID[i]).then(guildMember => {
            guildMember
              .addRole(role)
              .catch(error =>
                message.channel.send(
                  "Failed to add role to <@" + lordID[i] + ">"
                )
              );
          });

          console.log(`Added role!`);

          fs.appendFile(lordPath, "\n" + lordID[i], err => {
            if (err) throw err;
          });

          i++;
        }
      } else {
        message.channel.send("What the fuck how have you done that");
      }
    }
  }
};
