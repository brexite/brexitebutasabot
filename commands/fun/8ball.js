const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ballJSON = require("../../assets/8ball.json");
const ballArray = ballJSON["outcomes"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask The Magic 8 Ball (Patent Pending) anything.'),
    async execute(interaction) {

	let member = interaction.user;
	let guildMember = await interaction.guild.members.fetch(member.id);
	//Replies can have types: (+)pos, (-)neg, (+-)neutral, (?)images, (!)rude

	posCol = '#007000';
	negCol = '#D2222D';
	neuCol = '#FFBF00';
	rudeCol = '#551A8B';

	const ballEmbed = new EmbedBuilder()
	// .setColor('#0099ff')
	.setAuthor({name: '✨🔮 The Magic 8 Ball (Patent Pending) says... ✨🔮'})
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	// .setThumbnail('')
	// .setTimestamp()
        .setFooter({text: member.tag + " | " + guildMember.nickname, iconUrl: member.avatarURL()});

	let chosen = ballArray[Math.floor(Math.random()*ballArray.length)]

	if(!chosen.img) {
		ballEmbed.setThumbnail('https://cdn.discordapp.com/attachments/892434044527206481/947858482458165258/8ballas.png')
		ballEmbed.setTitle(chosen.reply);
	}

	switch(chosen.replyType) {
		case '+':
			ballEmbed.setColor(posCol);
			break;
		case '-':
			ballEmbed.setColor(negCol);
			break;
		case '+-':
			ballEmbed.setColor(neuCol);
			break;
		case '!':
			ballEmbed.setColor(rudeCol);
			break;
	}

    interaction.reply({ embeds: [ballEmbed] });
    },
};
