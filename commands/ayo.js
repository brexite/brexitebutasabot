const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "../assets/serverdata.json");
const serverData = require("../assets/serverdata.json");
require('dotenv').config();

module.exports = {
    name: 'ayo',
    aliases: [],
    description: `Update ayo count to specified number`,
    usage: `ayo <create/delete/rename/refresh/update>`,
    category: "Bot Owner",
    args: true,
    execute: async (bot, message, args) => {

        if (args[0]) {

            JSON.parse(fs.readFileSync(serverPath, "utf8"));
            const action = args[0];

            switch (action) {
                case "create":

                    if (serverData[message.guild.id].ayoCountChannelId) {
                        return message.reply(`A channel already exists under the name <#${serverData[message.guild.id].ayoCountChannelId}>. Either use "${process.env.PREFIX}ayo rename" or "${process.env.PREFIX}ayo delete"`)
                    }

                    var name = await channelName(message)
                    var channelName = name.content;
                    var channelId = await makeChannel(name, name.content);

                    serverData[message.guild.id].ayoCountChannelId = channelId;
                    serverData[message.guild.id].ayoCountChannelName = channelName;


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

                case "update":
                    console.log(args[1])
                    console.log(typeof args[1])
                    if(args[1] && typeof args[1] === 'number') {
                        serverData["818451050729177100"].ayoCount = args[1];
                        return message.reply(`Count has been updated to ${args[1]}!`)
                    } else {
                        return message.reply(`A count has not been specified. Use "${process.env.PREFIX}ayo update [number]".`)
                    }

                case "refresh":

                    if (!serverData[message.guild.id].ayoCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}ayo create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].ayoCountChannelId)) {
                        serverData[message.guild.id].ayoCountChannelId = null;
                        serverData[message.guild.id].ayoCountChannelName = null;

                        fs.writeFile(
                            serverPath,
                            JSON.stringify(serverData, null, "\t"),
                            err => {
                                console.error(err);
                            }
                        );
                        return message.reply(`The channel was unexpectedly deleted, create one now using "${process.env.PREFIX}ayo create".`)
                    }

                    var ayoCount = refreshChannel(message)
                    message.reply(`Channel refreshed, ayo count updated`);
                    break;

                case "rename":
                    if (!serverData[message.guild.id].ayoCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}ayo create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].ayoCountChannelId)) {
                        serverData[message.guild.id].ayoCountChannelId = null;
                        serverData[message.guild.id].ayoCountChannelName = null;

                        fs.writeFile(
                            serverPath,
                            JSON.stringify(serverData, null, "\t"),
                            err => {
                                console.error(err);
                            }
                        );
                        return message.reply(`The channel was unexpectedly deleted, create one now using "${process.env.PREFIX}ayo create".`)
                    }

                    var nameMsg = await channelName(message)
                    var name = nameMsg.content

                    serverData[message.guild.id].ayoCountChannelName = name;
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

                    if (!serverData[message.guild.id].ayoCountChannelId) {
                        return message.reply(`A channel has not been created. Create one now using "${process.env.PREFIX}ayo create".`)
                    }

                    if (!message.guild.channels.cache.get(serverData[message.guild.id].ayoCountChannelId)){

                    } else {
                        await message.guild.channels.cache.get(serverData[message.guild.id].ayoCountChannelId).delete();
                    }

                    serverData[message.guild.id].ayoCountChannelId = null;
                    serverData[message.guild.id].ayoCountChannelName = null;

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
            message.reply('What would you like the channel to be called?\n\nE.G. "Ayo Count is ${c}" or "${c} Ayos".')//add cancel ability

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
            var ayoCount = serverData["818451050729177100"].ayoCount;
            var ayoCountChannel = message.guild.channels.cache.get(serverData[message.guild.id].ayoCountChannelId);
            var ayoCountChannelName = serverData[message.guild.id].ayoCountChannelName;

            ayoCountChannelName = ayoCountChannelName.replace("${c}", ayoCount);

            var newId;
            ayoCountChannel.clone()
                .then(clone => {
                    newId = clone.id;
                    clone.setName(ayoCountChannelName);
                })
                .catch(console.error);
            await ayoCountChannel.delete();

            serverData[message.guild.id].ayoCountChannelId = newId;
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