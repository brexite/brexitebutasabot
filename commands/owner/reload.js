const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
        .addStringOption(option =>
			option.setName('type')
                .setDescription('The type of command to reload.')
                .setRequired(true)
                .setAutocomplete(true))
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)
                .setAutocomplete(true)),
	async execute(interaction) {
        const folderName = interaction.options.getString('type', true).toLowerCase();
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

        delete require.cache[require.resolve(`../${folderName}/${command.data.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
	},

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused(true);

        let choices;

        if (focusedValue.name === 'type') {
            try {
                const folders = await getFolders('./commands'); // Await the Promise
    
                if (!folders || folders.length === 0) {
                    return await interaction.respond([]); // Return an empty array if no folders are found
                }
    
                choices = folders.sort();
        
                const filtered = choices
                    .filter(choice => choice.toLowerCase().includes(focusedValue.value.toLowerCase()))
                    .slice(0, 25);
        
                await interaction.respond(filtered.map(choice => ({ name: capitaliseFirstLetter(choice), value: capitaliseFirstLetter(choice) })));
            } catch (error) {
                console.error("Error fetching folders:", error);
                await interaction.respond([]); // Return empty if an error occurs
            }
        }

        if (focusedValue.name === 'command') {
            let folderName = interaction.options.getString('type');
            if (!folderName || folderName == '') {
                return await interaction.respond([]);
            }

            try {
                let files = await getFileNames(`./commands/${folderName.toLowerCase()}/`);

                choices = files.sort();
        
                const filtered = choices
                    .filter(choice => choice.toLowerCase().includes(focusedValue.value.toLowerCase()))
                    .slice(0, 25);
        
                await interaction.respond(filtered.map(choice => ({ name: capitaliseFirstLetter(choice), value: capitaliseFirstLetter(choice) })));
            } catch (error) {
                console.error("Error fetching files:", error);
                await interaction.respond([]); // Return empty if an error occurs
            }
        };

    },
};

async function getFileNames(directory) {
    try {
        const items = await fs.readdir(directory, { withFileTypes: true }); // Await the async operation
        return items.filter(item => item.isFile()).map(item => item.name.slice(0, item.name.length - 3));
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

async function getFolders(directory) {
    try {
        const items = await fs.readdir(directory, { withFileTypes: true }); // Await the async operation
        return items.filter(item => item.isDirectory()).map(item => item.name);
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

function capitaliseFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}