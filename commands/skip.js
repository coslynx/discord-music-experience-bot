const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skips the currently playing song.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to skip the music!');
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }

        if (serverQueue.songs.length <= 1) {
            serverQueue.songs = [];
            serverQueue.connection.disconnect();
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription('No more songs in the queue. Music has stopped.');
            message.channel.send({ embeds: [embed] });
        } else {
            serverQueue.songs.shift();
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`Skipped to the next song: ${serverQueue.songs[0].title}`);
            message.channel.send({ embeds: [embed] });

            serverQueue.connection.dispatcher.end();
        }
    },
};