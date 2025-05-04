const { Events, MessageFlags } = require('discord.js');
const path = require("path");
const serverPath = path.join(__dirname, "./assets/serverdata.json");
const serverData = require("../assets/serverdata.json");

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
        if(newState.channel && serverData[newState.guild.id].vcRole.length > 0) {
            let role = newState.guild.roles.cache.find(role => role.id == serverData[newState.guild.id].vcRole);
            newState.member.roles.add(role).catch("Unable to find role");
        }
        else if (oldState.channel && serverData[oldState.guild.id].vcRole.length > 0){
            let role = oldState.guild.roles.cache.find(role => role.id == serverData[oldState.guild.id].vcRole);
            oldState.member.roles.remove(role).catch("Unable to find role");
        }
	},
};