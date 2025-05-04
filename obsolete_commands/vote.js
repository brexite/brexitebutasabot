const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const ms = require("ms");

module.exports = {
	name: "vote",
	aliases: ["poll"],
	description: "Creates a poll for your specified time, has to contain a question mark at the end",
	usage: "help (duration) <Poll topic>",
	category: "Util",
  execute: async (bot, message, args) => {

    var agree = ["✅", "✔️", "💚", "😍", "😳"];
    var disagree = ["🚫", "❌", "🗑", "😡", "🤮"];
    const shitNumber = Math.floor(Math.random() * agree.length);
    const currentAgree = agree[shitNumber];
    const currentDisagree = disagree[shitNumber];

    var timer = 20000
    let config = require("../config.json"),
      colour = config.colour;
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    if (!args) return message.reply("You must have something to vote for!");
    if (!message.content.includes("?"))
      return message.reply("Include a ? in your vote!");

    await sleep(100);
    await message.delete();

    var theQuestion;
    let voteEmbed = new Discord.MessageEmbed();
    if (ms(args[0])) {
      theQuestion = args.slice(1).join(" ");
      timer = ms(args[0]);
      voteEmbed.setTitle("Shit Poll: " + args[0]);
    } else {
      theQuestion = args.slice(0).join(" ");
      voteEmbed.setTitle("Shit Poll");
    }

    voteEmbed
      .setDescription(theQuestion)
      .setTimestamp()
      .setFooter(
        "Wait for both emoji to show before voting",
        "https://cdn.discordapp.com/app-icons/609326951592755211/db440b2935c9e563017568ec01ee43cd.png"
      );

    const voteTopic = await message.channel.send({embeds: [voteEmbed]});
    await voteTopic.react(currentAgree);
    await voteTopic.react(currentDisagree);

    const reactFilter = (reaction) => {
      console.log(`Collected ${reaction.emoji.name}`);
      return reaction.emoji.name == currentAgree ||
      reaction.emoji.name == currentDisagree
    }

    // Create a reaction collector
    voteTopic.awaitReactions({
      reactFilter,
      time: timer, 
      errors: ['time'] }
    ).then(collected =>{
      console.log(collected.size)
    }).catch(collected => {

      var votesYes = collected.get(currentAgree);
      var votesNo = collected.get(currentDisagree);

      if (votesYes == undefined) {
        votesYes = 0;
      } else {
        votesYes = collected.get(currentAgree).count - 1;
      }

      if (votesNo == undefined) {
        votesNo = 0;
      } else {
        votesNo = collected.get(currentDisagree).count - 1;
      }

      voteTopic.delete();

      const collectedEmbed = new Discord.MessageEmbed()
        .setTitle(theQuestion)
        .setAuthor("brexite but as a bot")
        .setColor(config.colour)
        .addField("YES", votesYes + ` Votes`, true)
        .addField("NO", votesNo + ` Votes`, true)
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/354594007873224704/527816017288626176/JPEG_20181221_213802.jpg")
        .setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));


      message.channel.send({embeds: [collectedEmbed]});
    })
  }
}
