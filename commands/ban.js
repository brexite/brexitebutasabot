module.exports = {
	name: 'ban',
	description: 'Ban command for banning',
	usage: 'ban <user tag> <reason>',
  category: "Admin",
  execute: async (bot, message, args) => {
        const Discord = require("discord.js");
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;
        let config = require('../config.json')
        
        if (!message.member.hasPermission("KICK_MEMBERS") && !config.ownerID.includes(message.member.id)) return;
        
        async function promptMessage(message, author, time, validReactions) {
          // We put in the time as seconds, with this it's being transfered to MS
          time *= 1000;

          // For every emoji in the function parameters, react in the good order.
          for (const reaction of validReactions) await message.react(reaction);

          // Only allow reactions from the author, 
          // and the emoji must be in the array we provided.
          const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

          // And ofcourse, await the reactions
          return message
              .awaitReactions(filter, { max: 1, time: time})
              .then(collected => collected.first() && collected.first().emoji.name);
        }

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("Please provide a person to ban.")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return message.reply("Please provide a reason to ban.")
                .then(m => m.delete(5000));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ I do not have permissions to ban members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply("This member doesn't exist.")
                .then(m => m.delete(5000));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("You can't ban yourself...")
                .then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("Yeah, nah I can't ban them")
                .then(m => m.delete(5000));
        }
        
        const embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**- banned member:** ${toBan} (${toBan.id})
            **- banned by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`ban canceled.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};