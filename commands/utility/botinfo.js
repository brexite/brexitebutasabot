const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const packageJSON = require("../../package.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Responds with user information!'),
    async execute(interaction) {
        let bot = interaction.guild.members.me;
        let member = interaction.user;
        let guildMember = await interaction.guild.members.fetch(member.id);
        let embed = new EmbedBuilder()
            .setAuthor({name: `BOT INFO | ${bot.user.tag}`, iconURL: bot.user.avatarURL(), url: "https://revsport.racing/"})
            .addFields(
            { name: 'Bot Version', value: `v${packageJSON.version}`, inline: true },
            { name: 'RAM Usage', value: `${getMemoryUsage()} / 2048MB`, inline: true },
            { name: 'Uptime', value: `${getUptimeString(bot)}`, inline: true },
            { name: 'Author', value: "`brexite`", inline: true },
            { name: 'GitHub', value: `[HERE](https://github.com/brexite/brexitebutasabot)`, inline: true },
            { name: 'Me?', value: `<:willoff:738540171254956064>`, inline: true }
            )
            .setTimestamp()
            .setColor(bot.displayHexColor)
            .setFooter({text: member.tag + " | " + guildMember.nickname, iconUrl: member.avatarURL()});
        
            return interaction.reply({embeds: [embed]});
    }
};


function getMemoryUsage() {
    try{
        let total_rss = require('fs').readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8").split("\n").filter(l => l.startsWith("total_rss"))[0].split(" ")[1]; 
        return Math.round( Number(total_rss) / 1e7 );
    } catch (error) {
        return 'nah'
    }
}

function getUptimeString(bot) {
  let output = ""
  let totalSeconds = (bot.uptime / 1000);

  let days = Math.floor(totalSeconds / 86400);
  days > 0 ? output = `${output}${days}d ` : output = output
  totalSeconds %= 86400;
  
  let hours = Math.floor(totalSeconds / 3600);
  hours > 0 || days > 1 ? output = `${output}${hours}h ` : output = output
  totalSeconds %= 3600;
  
  let minutes = Math.floor(totalSeconds / 60);
  minutes > 0 || days > 1 ? output = `${output}${minutes}m ` : output = output
  let seconds = Math.floor(totalSeconds % 60);

  output = `${output}${seconds}s `

  return output;
}
