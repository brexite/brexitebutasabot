const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverData = require("../assets/serverdata.json");
require('dotenv').config();

module.exports = {
    name: 'membercount',
    aliases: [],
    description: `Creates a member counting channel. Create will make a new VC with default permissions, Delete will remove it, Rename allows to rename the channel, Refresh will refresh the count`,
    usage: `membercount <create/delete/rename/refresh>`,
    category: "Admin",
    args: true,
    execute: async (bot, message, args) => {

        if (args[0]) {

            JSON.parse(fs.readFileSync(serverPath, "utf8"));
            const action = args[0];

            switch (action) {
                case "create":

                    if (serverData[message.guild.id].memberCountChannelId) {
                        return message.reply(`A channel already exists under the name <#${serverData[message.guild.id].memberCountChannelId}>. Either use "${process.env.PREFIX}membercount rename" or "${process.env.PREFIX}membercount delete"`)
                    }

                    var name = await channelName(message)
                    var channelName = name.content;
                    var channelId = await makeChannel(name, name.content);

                    serverData[message.guild.id].memberCountChannelId = channelId;
                    serverData[message.guild.id].memberCountChannelName = channelName;


                    fs.writeFile(
                        serverPath,
                        JSON.stringify(serverData, null, "\t"),
                        err => {
                            console.error(err);
                        }
                    );
                    refreshChannel(message);
                    message.reply("Channel Created!");
                    break;

                case "refresh":

                    if (!serverData[message.guild.id].memberCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}membercount create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].memberCountChannelId)) {
                        serverData[message.guild.id].memberCountChannelId = null;
                        serverData[message.guild.id].memberCountChannelName = null;

                        fs.writeFile(
                            serverPath,
                            JSON.stringify(serverData, null, "\t"),
                            err => {
                                console.error(err);
                            }
                        );
                        return message.reply(`The channel was unexpectedly deleted, create one now using "${process.env.PREFIX}membercount create".`)
                    }

                    var memberCount = refreshChannel(message)
                    message.reply(`Channel refreshed, member count updated`);
                    break;

                case "rename":
                    if (!serverData[message.guild.id].memberCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}membercount create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].memberCountChannelId)) {
                        serverData[message.guild.id].memberCountChannelId = null;
                        serverData[message.guild.id].memberCountChannelName = null;

                        fs.writeFile(
                            serverPath,
                            JSON.stringify(serverData, null, "\t"),
                            err => {
                                console.error(err);
                            }
                        );
                        return message.reply(`The channel was unexpectedly deleted, create one now using "${process.env.PREFIX}membercount create".`)
                    }

                    var nameMsg = await channelName(message)
                    var name = nameMsg.content

                    serverData[message.guild.id].memberCountChannelName = name;
                    fs.writeFile(
                        serverPath,
                        JSON.stringify(serverData, null, "\t"),
                        err => {
                            console.error(err);
                        }
                    );

                    message.reply("Channel has been renamed!")
                    refreshChannel(message)
                    break;

                case "delete":
                case "del":
                case "remove":

                    if (!serverData[message.guild.id].memberCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}membercount create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].memberCountChannelId)){

                    } else {
                        await message.guild.channels.cache.get(serverData[message.guild.id].memberCountChannelId).delete();
                    }

                    serverData[message.guild.id].memberCountChannelId = null;
                    serverData[message.guild.id].memberCountChannelName = null;

                    fs.writeFile(
                        serverPath,
                        JSON.stringify(serverData, null, "\t"),
                        err => {
                            console.error(err);
                        }
                    );
                    message.reply("Channel has been deleted!")
            }
        }
        return;

        async function channelName(message) {
            message.reply('What would you like the channel to be called?\n\nE.G. "Member Count is ${c}" or "${c} Members".')//add cancel ability

            const msg_filter = m => m.author.id === message.author.id;
            const msg = await message.channel.awaitMessages({ filter: msg_filter, max: 1 });
            const response = msg.first();

            if (!response.content.includes("${c}")) {
                message.reply("This request is invalid, try again!");
                return channelName(message);
            }

            return response;
        }

        async function makeChannel(message, name) {
            var botRole = message.guild.roles.cache.find(role => role.name = process.env.BOTNAME);

            var result = await message.guild.channels.create(name, {
                type: "GUILD_VOICE",
                permissionOverwrites: [{
                    id: message.guild.roles.everyone,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['CONNECT']
                },
                {
                    id: botRole,
                    allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS'],
                    deny: []
                }]
            })
            return result.id;
        }

        async function refreshChannel(message) {
            var memberCount = message.guild.memberCount;
            var memberCountChannel = message.guild.channels.cache.get(serverData[message.guild.id].memberCountChannelId);
            var memberCountChannelName = serverData[message.guild.id].memberCountChannelName;

            memberCountChannelName = memberCountChannelName.replace("${c}", memberCount);

            var newId;
            memberCountChannel.clone()
                .then(clone => {
                    newId = clone.id;
                    clone.setName(memberCountChannelName);
                })
                .catch(console.error);
            await memberCountChannel.delete();

            serverData[message.guild.id].memberCountChannelId = newId;
            fs.writeFile(
                serverPath,
                JSON.stringify(serverData, null, "\t"),
                err => {
                    console.error(err);
                }
            );
        }
    }
}