const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const { Message } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays a song from YouTube, Spotify, or SoundCloud.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to play music!');
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            message.client.queue.set(message.guild.id, queueConstruct);

            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                this.play(message.guild, queueConstruct.songs[0]);
            } catch (err) {
                console.error(err);
                message.client.queue.delete(message.guild.id);
                return message.channel.send('Error connecting to the voice channel, please try again.');
            }
        }

        const songInfo = await getInfo(args[0]);
        const song = {
            id: songInfo.videoId,
            title: songInfo.title,
            url: songInfo.video_url,
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`${song.title} has been added to the queue!`);
            return message.channel.send({ embeds: [embed] });
        }

        queueConstruct.songs.push(song);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`Started playing: ${song.title}`);
        message.channel.send({ embeds: [embed] });

        this.play(message.guild, queueConstruct.songs[0]);
    },
    async play(guild, song) {
        const serverQueue = guild.queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            guild.queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url, { filter: 'audioonly' }))
            .on('finish', () => {
                serverQueue.songs.shift();
                this.play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));

        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`Now playing: ${song.title}`);
        serverQueue.textChannel.send({ embeds: [embed] });
    }
};