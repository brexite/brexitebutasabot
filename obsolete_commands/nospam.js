module.exports = {
	name: "nospam",
	description: "Stop spamming!",
	usage: "nospam",
	category: "Fun",
  execute: async (bot, message, args) => {
    //this is where the actual code for the command goes
    message.delete();
    message.channel.send('https://cdn.glitch.com/48b7f59d-ed30-4a81-932f-c52986aa6b02%2Fnospam.gif?v=1591650072189');
  }
};