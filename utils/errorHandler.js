const { MessageEmbed } = require('discord.js');

const errorHandler = (error, message) => {
    console.error('An error occurred:', error);

    // Constructing an embed to send user-friendly error messages
    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error Occurred')
        .setDescription('An unexpected error has occurred. Please try again later.');

    // Handling specific error types to provide more context
    if (error.message) {
        embed.addField('Error Message', error.message);
    }

    // Send the error message to the channel where the command was executed
    if (message && message.channel) {
        message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Error sending error message:', err);
        });
    }
};

module.exports = errorHandler;