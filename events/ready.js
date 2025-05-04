const { Events, ActivityType, PresenceUpdateStatus } = require('discord.js');

const path = require("path");
const serverPath = path.join(__dirname, "./assets/serverdata.json");
const serverData = require("../assets/serverdata.json");

//ENV
require('dotenv').config();
const botonChannel = process.env.BOTONCHANNEL;

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        client.user.setPresence({ activities: [{ name: 'Mongolian F4', type: ActivityType.Competing }], status: PresenceUpdateStatus.DoNotDisturb });
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.channels.cache.get(botonChannel).send(`**[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} UTC]** - BOT ONLINE.`)

        //Clear commands
        //const guild = client.guilds.cache.get("280423419722465281");

		// This updates immediately
		//guild.commands.set([]);
        //client.application.commands.set([]);

		setInterval(function () {
			for(var key in serverData) {
				var serverId = key
				var guild = client.guilds.cache.get(serverId)

				var channelName = serverData[serverId].memberCountChannelName
				var channelId = serverData[serverId].memberCountChannelId
			
				var ayoChannelName = serverData[serverId].ayoCountChannelName
				var ayoChannelId = serverData[serverId].ayoCountChannelId
				var ayoCount = serverData[serverId].ayoCount
				
				if (channelId) {
					var memberCount = guild.memberCount;
					var memberCountChannel = guild.channels.cache.get(channelId);
					
					channelName = channelName.replace("${c}", memberCount);

					if(memberCountChannel.name != channelName)
						memberCountChannel.setName(channelName).then(() => {
							console.log("Updating " + serverId + " to " + memberCount + " members");
						}).catch(() => {
							console.log("Channel may not exist");
						})
					
				}
				
				if (ayoChannelId) {
					var ayoCountChannel = guild.channels.cache.get(ayoChannelId)

					ayoChannelName = ayoChannelName.replace("${c}", ayoCount);

					if(ayoCountChannel.name != ayoChannelName)
						ayoCountChannel.setName(ayoChannelName).then(() => {
							console.log("Updating " + serverId + " to " + ayoCount + " ayos");
						}).catch(() => {
							console.log("Ayo Channel may not exist");
						})
				}      
			}
		}, 1001 * 60 * 6);  //approx 6 mins
	},
};