const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Sends a suggestion to the bot creator.')
        .addStringOption(option =>
          option.setName('suggestion')
            .setDescription('A suggestion to send.')
            .setRequired(true)),
    async execute(interaction) {

      let guild = interaction.guild;
      let bot = interaction.guild.members.me;
      let member = interaction.user;
      let guildMember = await interaction.guild.members.fetch(member.id);

      let suggestion = interaction.options.getString('suggestion', true);

      let embed = new EmbedBuilder()
        .setAuthor({name: "NEW SUGGESTION", iconURL: bot.user.avatarURL()})
        .addFields({name: "Suggestion", value: suggestion})
        .setTimestamp()
        .setColor(bot.displayHexColor)
        .setFooter({text: member.tag + " | " + guild.name, iconUrl: member.avatarURL()});
      
      interaction.client.guilds.cache.get(process.env.LOGSSERVER).channels.cache.get(process.env.LOGSCHANNEL).send({embeds: [embed]})
        
      interaction.reply("thats cool mate cheers");
    },
};
