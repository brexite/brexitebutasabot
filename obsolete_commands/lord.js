module.exports = {
	name: "lord",
	description: "Picks the Lord of the Week [currently only for Podel Server]",
	usage: "lord",
	category: "Admin",
}

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
    var guild = message.guild;
    var authorID = message.author.id; // unused
    var lordID = []; // Array of chosen lords

    let lordSelection = message.guild
      // .roles.get("696684182218473522")
      .members.map(m => m.user);

    lordArray = lordArray.slice(Math.max(lordArray.length - 18, 0));

    if (message.member.hasPermission("KICK_MEMBERS")) {
      var i = 0;
      var count = 0;
      
      while (i < 1) {
      var user =
        lordSelection[Math.floor(Math.random() * lordSelection.length)];

        while ((
          lordArray.includes(`${user.id}`) == true ||
          guild.members.get(`${user.id}`).hasPermission("KICK_MEMBERS") ||
          lordID.includes(`${user.id}` == true)) && count < 25
        ) {
          user = lordSelection[Math.floor(Math.random() * lordSelection.length)];
          count++;
        }
        
        if (!user) return console.log("Error finding new lord")
        if (lordArray.includes(`${user.id}`) == true ||
          guild.members.get(`${user.id}`).hasPermission("KICK_MEMBERS") ||
          lordID.includes(`${user.id}` == true)) return console.log("Error finding new lord")

        lordID.push(`${user.id}`);
        console.log(lordID);

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
        "Do you wish to make these people lords?"
      );

      await lorder.react("✅");
      await lorder.react("🚫");

      // Create a reaction collector
      const results = await lorder.awaitReactions(
        reaction => reaction.emoji.name === "✅" || reaction.emoji.name === "🚫",
        { time: 10000 }
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
      else if (votesYes < 1)
        message.channel.send(
          "Vote failed (requires 2 to pass) `[Yes: " + votesYes + " | No: " + votesNo + "]`"
        );



        else if (votesYes > votesNo) {
          message.channel.send(
            "Vote passed! `[Yes: " + votesYes + " | No: " + votesNo + "]`"
          ).then(guild.channels.find(c => c.name === "announcements").send("this week's lords are: <@" + lordID[0]+ ">, <@" + lordID[1]+ "> and <@" + lordID[2]+ "> \n\n please please please consider employment")
          ).catch(error => message.channel.send("Announcement failed, template here \n\n `this week's lords are: <@" + lordID[0]+ ">, <@" + lordID[1]+ "> and <@" + lordID[2]+ "> \n\n please please please consider employment`"))
          
          let role = await message.guild.roles.find(
            t => t.name == "House of Lords"
          );
  
          await message.guild.members.forEach(member => {
            if (
              !member.roles.find(t => t.name == "House of Lords") ||
              lordID.includes(member.id)
            )
              return;
            member.removeRole(role.id).then(function() {
              console.log(`Removed role from user ${member.user.tag}!`)}).catch(error => message.channel.send("Failed to remove role to <@"+`${member.user.tag}`+">"));
          });
  
          var i = 0;
          while (i < lordID.length) {
            await message.guild.fetchMember(lordID[i]).then(guildMember => {
              guildMember.addRole(role)}).catch(error => message.channel.send("Failed to add role to <@"+lordID[i]+">"));

          console.log(`Added role!`);

          // fs.appendFile(lordPath, "\n" + lordID[i], err => {
          //   if (err) throw err;
          // });

          i++;
        }


      } else {
        message.channel.send("What the fuck how have you done that");
      }
    }
}
