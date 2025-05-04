const { Events, MessageFlags } = require('discord.js');
const path = require("path");
const fs = require('node:fs');
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverData = require("../assets/serverdata.json");
const replyJSON = require("../assets/replyArray.json");
const replyArray = replyJSON["replies"];


module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {

        // VERY IMPORTANT
        if (interaction.author.bot) return;

        if (interaction.guildId == null) {
            try {
              interaction.channel.send(replyArray[Math.floor(Math.random() * replyArray.length)])
            } catch {
              console.error;
            };

            return;
        }

        if (!serverData[interaction.guild.id]) {
            serverData[interaction.guild.id] = {
                
		      imDoingFeature: false,
              vcChannel:[],
              vcRole:[]
            };
        }

        // Only for REVSPORT
        if (interaction.guild && interaction.channel.id === "819315870735007794") {
            if (interaction.content == "<:ayo:923313397855035513>") {
              serverData[interaction.guild.id].ayoCount += 1;
              console.log("ayo detected")
        
              fs.writeFile(
                serverPath,
                JSON.stringify(serverData, null, "\t"),
                err => {
                    if (err) console.error(err);
                }
              );
              return;
            }
        }

		// Bruh react
        if (interaction.content == "bruh") interaction.react('891716288576122910');

        // Catch imdoing if not enabled
        if (!serverData[interaction.guild.id].imDoingFeature) return;

        // Catch imdoing if enabled
        if ((interaction.content.startsWith("im doing") || interaction.content.startsWith("i'm doing"))) {
            var urmom = interaction.content;
            urmom = urmom.replace(" doing", "");
            if (urmom.length <= 1 || interaction.content.toLowerCase().includes('HTTP'.toLowerCase())) return;

            if (urmom == 'im') urmom = 'im stuff'

            interaction.channel.send({content: urmom, allowedMentions: { parse: ['users'], repliedUser: false } });
        }
	},
};