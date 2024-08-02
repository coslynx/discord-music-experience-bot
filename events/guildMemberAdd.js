const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    async execute(member) {
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome'); // Adjust the channel name as needed

        if (!welcomeChannel) return;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('New Member Joined!')
            .setDescription(`Welcome to the server, ${member.user.username}! We're glad to have you here. Feel free to check out the channels and interact with everyone!`)
            .setThumbnail(member.user.avatarURL())
            .setFooter('Enjoy your stay!');

        try {
            await welcomeChannel.send({ embeds: [embed] });
            console.log(`Welcome message sent to ${member.user.username}`);
        } catch (error) {
            console.error('Error sending welcome message:', error);
        }
    }
};