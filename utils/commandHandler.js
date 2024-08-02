const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const Logger = require('./logger');
const errorHandler = require('./errorHandler');

class CommandHandler {
    constructor(client) {
        this.client = client;
        this.commands = new Map();
        this.loadCommands();
    }

    loadCommands() {
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            this.commands.set(command.name, command);
        }
    }

    async handleCommand(message) {
        if (!message.content.startsWith(this.client.prefix) || message.author.bot) return;

        const args = message.content.slice(this.client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = this.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            Logger.error(`Error executing command ${command.name}: ${error.message}`);
            errorHandler(error, message);
        }
    }
}

module.exports = CommandHandler;