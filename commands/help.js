module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'help (command name)',
  category: "Util",
  execute: async (bot, message, args) => {

	console.log("fuck off")
    
  const Discord = require("discord.js");
  const fs = require("fs");
  const path = require("path");
  const certPath = path.join(__dirname, '../assets/footerArray.txt');
  var text = fs.readFileSync(certPath, "utf-8");
  var footerArray = text.split("\n")
  let config = require('../config.json'),
      colour = config.colour;
    

	const embed = new Discord.MessageEmbed()
		.setColor("#4f1110")
		.setAuthor(`${bot.user.username} Help`, bot.user.displayAvatarURL)
		.setFooter(footerArray[Math.floor(Math.random()*footerArray.length)], message.author.displayAvatarURL)
		.setTimestamp();
	if (args[0]) {
		let command = args[0];
		if (bot.commands.has(command)) {
			command = bot.commands.get(command);
		}
		else if (bot.aliases.has(command)) {
			command = bot.commands.get(bot.aliases.get(command));
		}
		if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${process.env.PREFIX}help\` for the list of the commands.`));
		embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} command help`);
		embed.setDescription([
			`❯ **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
			`❯ **Description:** ${command.description || "No Description provided."}`,
			`❯ **Usage:** ${command.usage ? `\`${process.env.PREFIX}${command.usage}\`` : "No Usage"} `,
			`❯ **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`,
			`❯ **Category:** ${command.category ? command.category : "General" || "Misc"}`,
		].join("\n"));

		return message.channel.send(embed);
	}
	const categories = fs.readdirSync("./commands/");
  
	embed.setDescription([
		`Available commands for ${bot.user.username}.`,
		`The bot prefix is **${process.env.PREFIX}**`,
		"`<>`means needed and `()` means optional",
	].join("\n"));
  var done = [];
  var output = [];
	categories.forEach(category => {
    
    category = bot.commands.get(category.substring(0, category.length - 3)).category;
    
		const dir = bot.commands.filter(c => c.category.toLowerCase() === category.toLowerCase());
		const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
    
		try {
			if (dir.size === 0 || done.includes(`${capitalise}`)) return;
      
      done.push(`${capitalise}`);
      output.push([`❯ ${capitalise}`, dir.map(c => `\`${c.name}\``).join(", ")])
			// embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.name}\``).join(", "));
		}
		catch (e) {
			console.log(e);
		}
	});
  
  output = output.sort(function(a,b){ return a[0] > b[0] ? 1 : -1; });
  
  var i = 0;
  output.forEach(element =>{
    embed.addField(output[i][0].toString(),output[i][1].toString())
    i++;
  })
	return message.channel.send({embeds: [embed]});
  }
}