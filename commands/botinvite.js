module.exports = {
    name: 'botinvite',
    description: 'Gives the invite to the bot',
    usage: 'botinvite',
    category: "Util",
    execute: async (bot, message, args) => {
        message.reply(`check dms x`);
        message.author.send(`Add the bot to your server!\nhttps://discord.com/api/oauth2/authorize?client_id=609326951592755211&permissions=1642787761399&scope=bot`);
    }
}