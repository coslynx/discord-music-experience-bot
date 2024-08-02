const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands and their descriptions.',
    execute(message) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Command List')
            .setDescription('Here are the commands you can use with this music bot:');

        const commands = [
            { name: '!play <song>', description: 'Plays a song from YouTube, Spotify, or SoundCloud.' },
            { name: '!pause', description: 'Pauses the currently playing music.' },
            { name: '!skip', description: 'Skips the currently playing song.' },
            { name: '!stop', description: 'Stops the music and clears the queue.' },
            { name: '!queue', description: 'Displays the current music queue.' },
            { name: '!volume <level>', description: 'Adjusts the playback volume.' },
            { name: '!search <query>', description: 'Search for a song using keywords.' },
            { name: '!playlist <create|add|remove|view>', description: 'Manages your custom playlists.' }
        ];

        commands.forEach(cmd => {
            embed.addField(cmd.name, cmd.description, false);
        });

        embed.setFooter('Use the commands to enhance your music experience!');

        message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Error sending help message:', err);
            message.channel.send('There was an error retrieving the help information. Please try again later.');
        });
    },
};