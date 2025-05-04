const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ComponentType, ChannelType, PermissionFlagsBits } = require('discord.js');
const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../../assets/serverdata.json");
const serverData = require("../../assets/serverdata.json");
const { ViewChannel, Connect, ManageChannels, SendMessages } = PermissionFlagsBits
require('dotenv').config();

// 1346542686349557791


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ayosetup')
        .setDescription('For setting Ayo Channel in REVSPORT'),
    async execute(interaction) {

        if (interaction.guild.id != '818451050729177100' && interaction.guild.id != '280423419722465281')
            return interaction.reply('Nope, sorry');

        const createButton = new ButtonBuilder()
            .setCustomId("createButton")
            .setEmoji("✳️")
            .setLabel("Create")
            .setStyle(3);

        const relinkButton = new ButtonBuilder()
            .setCustomId("relinkButton")
            .setEmoji("🔗")
            .setLabel("Relink")
            .setStyle(3);

        const updateButton = new ButtonBuilder()
            .setCustomId("updateButton")
            .setEmoji("🔢")
            .setLabel("Update")
            .setStyle(2);

        const refreshButton = new ButtonBuilder()
            .setCustomId("refreshButton")
            .setEmoji("🔃")
            .setLabel("Refresh")
            .setStyle(2);

        const renameButton = new ButtonBuilder()
            .setCustomId("renameButton")
            .setEmoji("📝")
            .setLabel("Rename")
            .setStyle(2);

        const deleteButton = new ButtonBuilder()
            .setCustomId("deleteButton")
            .setEmoji("⛓️‍💥")
            .setLabel("Unlink")
            .setStyle(4);

        let row = new ActionRowBuilder()
        if(!serverData[interaction.guild.id].ayoCountChannelId)
            row.addComponents(createButton, relinkButton);
        else
            row.addComponents(relinkButton, updateButton, refreshButton, renameButton, deleteButton);



        const menuResponse = await interaction.reply({ content: "What would you like to do?", components: [row], withResponse: true });
        const collectorFilter = i => i.user.id === interaction.user.id;

        const confirmation = await menuResponse.resource.message.awaitMessageComponent({ filter: collectorFilter, componentType: ComponentType.Button });

        switch (confirmation.customId) {
            case 'createButton':
                const collectorCreateFilter = m => m.content.includes('${c}');
                interaction.editReply({ content: 'What would you like the channel to be called?\n\nE.G. "Ayo Count is ${c}" or "${c} Ayos".', components: [] })
                    .then(() => {
                        interaction.channel.awaitMessages({ filter: collectorCreateFilter, max: 1 })
                            .then(collected => {
                                let channelName = collected.first().content;

                                let botRole = interaction.guild.roles.cache.find(role => role.name == process.env.BOTNAME);

                                return interaction.guild.channels.create({
                                    name: channelName,
                                    type: ChannelType.GuildVoice,
                                    permissionOverwrites: [{
                                        id: interaction.guild.roles.everyone,
                                        allow: [ViewChannel],
                                        deny: [Connect, SendMessages]
                                    },
                                    {
                                        id: botRole,
                                        allow: [ViewChannel, ManageChannels, Connect, SendMessages],
                                        deny: []
                                    }]
                                }).then(res => {
                                    serverData[interaction.guild.id].ayoCountChannelId = res.id;
                                    serverData[interaction.guild.id].ayoCountChannelName = channelName;
    
                                    fs.writeFile(
                                        serverPath,
                                        JSON.stringify(serverData, null, "\t"),
                                        err => {
                                            console.error(err);
                                        }
                                    );
    
                                    interaction.editReply(`Channel created!`);
                                    return collected.first().delete();
                                });
                            })
                            .catch(() => {
                                interaction.followUp('Interaction timed out.');
                            });
                    });
                break;

            case 'relinkButton':
                const collectorRelinkFilter = m => !isNaN(m.content);
                await interaction.editReply({ content: 'Please provide the channel ID of your ayo channel.', components: [] })
                    .then(() => {
                        interaction.channel.awaitMessages({ filter: collectorRelinkFilter, max: 1 })
                            .then(collected => {
                                let channelId = collected.first().content;

                                serverData[interaction.guild.id].ayoCountChannelId = channelId;

                                fs.writeFile(
                                    serverPath,
                                    JSON.stringify(serverData, null, "\t"),
                                    err => {
                                        console.error(err);
                                    }
                                );
                                
                                collected.first().delete();
                                interaction.editReply(`Channel relinked, Ayo count updated`);
                                return refreshChannel(interaction);
                            })
                            .catch(() => {
                                interaction.editReply('Interaction timed out.');
                            });
                    });
                break;

            case 'updateButton':
                const collectorUpdateFilter = m => !isNaN(m.content);
                await interaction.editReply({ content: 'What would you like to update the count to?', components: [] })
                    .then(() => {
                        interaction.channel.awaitMessages({ filter: collectorUpdateFilter, max: 1 })
                            .then(collected => {
                                let number = collected.first().content;

                                serverData[interaction.guild.id].ayoCount = number;

                                fs.writeFile(
                                    serverPath,
                                    JSON.stringify(serverData, null, "\t"),
                                    err => {
                                        console.error(err);
                                    }
                                );
                                
                                collected.first().delete();
                                interaction.editReply(`Channel updated, Ayo count updated`);
                                return refreshChannel(interaction);
                            })
                            .catch(() => {
                                interaction.editReply('Interaction timed out.');
                            });
                    });
                break;

            case 'refreshButton':
                interaction.editReply({ content: 'Channel Refreshed', components: [] });
                return refreshChannel(interaction);

            case 'renameButton':
                const collectorRenameFilter = m => m.content.includes('${c}');
                interaction.editReply({ content: 'What would you like the channel to be called?\n\nE.G. "Ayo Count is ${c}" or "${c} Ayos".', components: [] })
                    .then(() => {
                        //check channel exists
                        interaction.channel.awaitMessages({ filter: collectorRenameFilter, max: 1 })
                            .then(collected => {
                                let channelName = collected.first().content;

                                serverData[interaction.guild.id].ayoCountChannelName = channelName;

                                fs.writeFile(
                                    serverPath,
                                    JSON.stringify(serverData, null, "\t"),
                                    err => {
                                        console.error(err);
                                    }
                                );

                                interaction.editReply(`Channel renamed!`);
                                collected.first().delete();
                                return refreshChannel(interaction);
                            })
                            .catch(() => {
                                interaction.followUp('Interaction timed out.');
                            });
                    });
                break;

            case 'deleteButton':
                serverData[interaction.guild.id].ayoCountChannelId = null;
                serverData[interaction.guild.id].ayoCountChannelName = null;

                fs.writeFile(
                    serverPath,
                    JSON.stringify(serverData, null, "\t"),
                    err => {
                        console.error(err);
                    }
                );

                return interaction.editReply({ content: 'Channel has been unlinked!.', components: [] });

            default:
                break;
        }
    },
};

function refreshChannel(interaction) {
    var guild = interaction.guild;

    var ayoChannelName = serverData[guild.id].ayoCountChannelName
    var ayoChannelId = serverData[guild.id].ayoCountChannelId
    var ayoCount = serverData[guild.id].ayoCount

    var ayoCountChannel = guild.channels.cache.get(ayoChannelId)

    ayoChannelName = ayoChannelName.replace("${c}", ayoCount);
    console.log(ayoCountChannel)
    ayoCountChannel.setName(ayoChannelName).then(() => {
        console.log("Updating " + guild.id + " to " + ayoCount + " ayos");
    })
}