module.exports = {
    name: 'ping',
    description: 'Pings the bot',
    usage: 'ping',
    category: "Util",
    execute: async (bot, message, args) => {
        message.reply(`https://discord.com/api/oauth2/authorize?client_id=609326951592755211&permissions=1642787761399&scope=bot`);
    }
}