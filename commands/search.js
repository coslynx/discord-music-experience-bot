const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const { YOUTUBE_API_KEY } = process.env;

module.exports = {
    name: 'search',
    description: 'Search for a song using keywords.',
    async execute(message, args) {
        if (!args.length) {
            return message.reply('Please provide a search query.');
        }

        const query = args.join(' ');
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

        try {
            const response = await axios.get(url);
            const videos = response.data.items;

            if (videos.length === 0) {
                return message.reply('No results found for your search query.');
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Search Results')
                .setDescription('Here are the top results for your query:');

            videos.forEach((video) => {
                const title = video.snippet.title;
                const videoId = video.id.videoId;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                embed.addField(title, videoUrl, false);
            });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching search results:', error);
            message.reply('An error occurred while searching for the song. Please try again later.');
        }
    },
};