const { SlashCommandBuilder } = require('discord.js');
const replyJSON = require("../../assets/replyArray.json");
const replyArray = replyJSON["replies"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poke')
        .setDescription('See what happens foenem.'),
    async execute(interaction) {
        await interaction.reply(replyArray[Math.floor(Math.random()*replyArray.length)]);
    },
};