require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let config = require("../../config.json")
const fs = require("fs");
const path = require("path");
const Discord = require('discord.js')

const replyPath = path.join(__dirname, "../../assets/replyArray.json");
const replyJSON = require("../../assets/replyArray.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addreply')
        .setDescription('Adds a reply to the replyArray.')
        .addStringOption(option =>
          option.setName('text')
            .setDescription('The text to add to the replies.')
            .setRequired(true)),
    async execute(interaction) {

    let bot = interaction.guild.members.me;
    let member = interaction.user;
    let guildMember = await interaction.guild.members.fetch(member.id);
        
    let reply = interaction.options.getString('text', true);
    var match = /\r|\n/.exec(reply);
    
    if (match) return interaction.reply("Text contained newlines within, piss off kindly")

    replyJSON['replies'].push(reply);
      fs.writeFile(replyPath, JSON.stringify(replyJSON, null, "\t"), (err) => {

      if (err) {
        console.error(err)
        return interaction.reply([]);
      }
    });

    let embed = new EmbedBuilder()
    .setAuthor({name: "REPLY #" + String(replyJSON['replies'].length), iconURL: bot.user.avatarURL()})
    .addFields({name: "New Reply added: ", value: reply})
    .setTimestamp()
    .setColor(bot.displayHexColor)
    .setFooter({text: member.tag + " | " + guildMember.nickname, iconUrl: member.avatarURL()});

    interaction.client.guilds.cache.get(process.env.LOGSSERVER).channels.cache.get(process.env.LOGSCHANNEL).send({embeds: [embed]})

    interaction.reply("thats cool mate cheers");
  },
};