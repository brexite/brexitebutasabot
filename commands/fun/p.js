const Discord = require('discord.js');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const replyJSON = require("../../assets/replyArray.json");
const replyArray = replyJSON["replies"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('p'),
    async execute(interaction) {

    let bot = interaction.guild.members.me;
    let member = interaction.user;
    let guildMember = await interaction.guild.members.fetch(member.id);
    
    var i = 0;
    var random = [Math.ceil(Math.random() * 25)];

    const embed = new EmbedBuilder()
        .setTitle("p")
        .setDescription("p")
        .setAuthor({ name: "p", iconUrl: "https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078" })
        .setColor(guildMember.displayHexColor)
        .setURL("https://steamcommunity.com/groups/ihitp2018")
      while (i < random) { 
        embed.addFields({ name: 'p',
          value: "p", inline: true })
        i++;
      }
      embed.setThumbnail("https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078")
        .setFooter({ text: "p", iconUrl: "https://cdn.glitch.com/31aee208-edbd-49e7-83d9-b3a8ff155873%2Fp.png?v=1588550292078" });
      return interaction.reply({content: 'p', embeds: [embed]});
    },
};

