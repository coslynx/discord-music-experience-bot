const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config/env.config.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // Ignore bot messages
        if (message.author.bot) return;

        // Parse command and arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Only proceed if the message starts with the prefix
        if (!message.content.startsWith(prefix)) return;

        // Load command file
        const command = message.client.commands.get(commandName);
        
        // Check if the command exists
        if (!command) return;

        try {
            // Execute command
            await command.execute(message, args);
        } catch (error) {
            console.error('Error executing command:', error);
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription('There was an error while executing the command.');
            message.channel.send({ embeds: [errorEmbed] });
        }
    },
};