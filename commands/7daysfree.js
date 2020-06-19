module.exports = {
	name: "7daysfree",
	description: "It's 7 days, for free!",
	usage: "7daysfree",
	category: "Fun",
  execute: async (bot, message, args) => {
    //this is where the actual code for the command goes
    message.delete();
    message.channel.send('https://cdn.glitch.com/48b7f59d-ed30-4a81-932f-c52986aa6b02%2F7daysfree.gif?v=1591405740033');
  }
}