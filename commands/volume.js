const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Adjusts the playback volume.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to adjust the volume!');
        }

        const newVolume = parseInt(args[0]);

        if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) {
            return message.reply('Please provide a valid volume level between 0 and 100.');
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }

        serverQueue.volume = newVolume;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(newVolume / 100);
        
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`Volume has been set to ${newVolume}!`)
            .setFooter('Use the command !volume <level> to adjust the volume.');

        message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Error sending volume message:', err);
        });
    }
};