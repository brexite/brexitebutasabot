const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Responds with user information!'),
    async execute(interaction) {
            
        //emojis
        const willoff = "<:willoff:738540171254956064>";
        let member = interaction.user;
        let botCheck = !!member.bot ? "✅" : "❌";
        let guildMember = await interaction.guild.members.fetch(member.id);

        var userCreated = new Date(member.createdTimestamp)
        userCreated = userCreated.toUTCString()
        
        var userJoinedGuild = new Date(guildMember.joinedTimestamp)    
        userJoinedGuild = userJoinedGuild.toUTCString()

        const embed = new EmbedBuilder()
            .setTitle(member.tag)
            .setColor(guildMember.displayHexColor)
            .setThumbnail(member.avatarURL())
            .setDescription([
                `${willoff}` + "**Nickname:** "+ member.displayName,
                `${willoff}` + "**ID:** `"+ member.id+"`",
                `${willoff}` + `**Joined Guild:** ${userJoinedGuild}`,
                `${willoff}` + `**Joined Discord:** ${userCreated}`,
                "‎",
                `${willoff}` + "**Bot:** " + botCheck,
                `${willoff}` + "**Roles:** " + guildMember.roles.cache.map(r => `${r}`).join(' | ')
            ].join("\n"));
        
        embed.setTimestamp()
        .setFooter({text: member.tag + " | " + guildMember.nickname, iconUrl: member.avatarURL()});
        return interaction.reply({embeds: [embed]});
    }
};
