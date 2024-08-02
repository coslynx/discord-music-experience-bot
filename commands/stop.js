const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stops the music and clears the queue.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to stop the music!');
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.reply('There is no music playing in this server.');
        }

        serverQueue.songs = [];
        serverQueue.connection.disconnect();

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription('Music has been stopped and the queue has been cleared!');

        message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Error sending stop message:', err);
        });
    },
};