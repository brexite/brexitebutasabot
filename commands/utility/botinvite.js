const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinvite')
        .setDescription('Returns an invite link to the bot.'),
    async execute(interaction) {
        let bot = interaction.guild.members.me;

        await interaction.reply('check dms x');
        return interaction.user.send(`Add the bot to your server!\nhttps://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=1642787761399&scope=bot`);
    },
};