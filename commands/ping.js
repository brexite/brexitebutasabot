module.exports = {
    name: 'ping',
    description: 'Pings the bot',
    usage: 'ping',
    category: "Util",
    execute: async (bot, message, args) => {
        message.reply(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }
}