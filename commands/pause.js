const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Pauses the currently playing music.',
    async execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to pause the music!');
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }

        if (serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription('Music has been paused! Use the command !resume to continue playing the music.');

            message.channel.send({ embeds: [embed] }).catch(err => {
                console.error('Error sending pause message:', err);
            });
        } else {
            message.reply('Music is already paused. Use !resume to continue playback.');
        }
    },
};