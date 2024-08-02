const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const axios = require('axios');
const { YOUTUBE_API_KEY } = process.env;
const QueueService = require('./queueService');

class MusicService {
    constructor(guildId) {
        this.guildId = guildId;
        this.queueService = new QueueService(guildId);
    }

    async play(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to play music!');
        }

        const songInfo = await this.getSongInfo(args[0]);
        const song = {
            id: songInfo.videoId,
            title: songInfo.title,
            url: songInfo.video_url,
        };

        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            message.client.queue.set(this.guildId, queueConstruct);
            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                this.queueService.addSong(song, message);
                this.queueService.play(song);
            } catch (err) {
                console.error(err);
                message.client.queue.delete(this.guildId);
                return message.channel.send('Error connecting to the voice channel, please try again.');
            }
        } else {
            serverQueue.songs.push(song);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`${song.title} has been added to the queue!`);
            return message.channel.send({ embeds: [embed] });
        }
    }

    async skip(message) {
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }
        this.queueService.skip();
    }

    async stop(message) {
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }
        this.queueService.stop();
    }

    async pause(message) {
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }
        this.queueService.pause();
    }

    async resume(message) {
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }
        this.queueService.resume();
    }

    async setVolume(message, args) {
        const newVolume = parseInt(args[0]);
        if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) {
            return message.reply('Please provide a valid volume level between 0 and 100.');
        }
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no song currently playing in this server.');
        }
        serverQueue.volume = newVolume;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(newVolume / 100);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`Volume has been set to ${newVolume}!`);
        return message.channel.send({ embeds: [embed] });
    }

    async getSongInfo(query) {
        try {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&type=video`;
            const response = await axios.get(url);
            if (response.data.items.length === 0) {
                throw new Error('No results found');
            }
            return response.data.items[0].snippet;
        } catch (err) {
            console.error('Error fetching song info:', err);
            throw new Error('Could not retrieve song information.');
        }
    }

    async getCurrentQueue(message) {
        const serverQueue = message.client.queue.get(this.guildId);
        if (!serverQueue) {
            return message.reply('There is no music playing in the queue.');
        }
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Current Music Queue')
            .setDescription('Here are the songs in the queue:');
        serverQueue.songs.forEach((song, index) => {
            embed.addField(`${index + 1}. ${song.title}`, `Requested by: ${song.requestedBy || 'Unknown'}`, false);
        });
        embed.setFooter(`Total songs: ${serverQueue.songs.length}`);
        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = MusicService;