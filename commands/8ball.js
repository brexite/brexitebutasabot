const ballJSON = require("../assets/8ball.json");
const ballArray = ballJSON["outcomes"];

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "8ball",
	description: "Ask The Magic 8 Ball (Patent Pending) anything",
	usage: "8ball (question)",
	category: "Fun",
  execute: async (bot, message, args) => {

	//Replies can have types: (+)pos, (-)neg, (+-)neutral, (?)images, (!)rude

	posCol = '#007000';
	negCol = '#D2222D';
	neuCol = '#FFBF00';
	rudeCol = '#551A8B';

	const ballEmbed = new MessageEmbed()
	// .setColor('#0099ff')
	.setAuthor('✨🔮 The Magic 8 Ball (Patent Pending) says... ✨🔮')
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	// .setThumbnail('')
	// .setTimestamp()
	.setFooter(message.member.user.tag + " | " + message.guild.name, message.member.user.avatarURL({ dynamic:true }));

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

    message.reply({ embeds: [ballEmbed] });
  }
};
