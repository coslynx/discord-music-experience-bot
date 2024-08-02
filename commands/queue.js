const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Displays the current music queue.',
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.reply('There is no music playing in the queue.');
        }

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Current Music Queue')
            .setDescription('Here are the songs in the queue:');

        serverQueue.songs.forEach((song, index) => {
            embed.addField(`${index + 1}. ${song.title}`, `Requested by: ${song.requestedBy}`, false);
        });

        embed.setFooter(`Total songs: ${serverQueue.songs.length} | Use !play <song> to add more!`);

        message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Error sending queue message:', err);
        });
    },
};