const { MessageEmbed } = require('discord.js');

class QueueService {
    constructor(guildId) {
        this.guildId = guildId;
        this.songs = [];
        this.volume = 5;
        this.playing = false;
        this.connection = null;
        this.textChannel = null;
        this.voiceChannel = null;
    }

    async play(song) {
        const serverQueue = global.queue.get(this.guildId);

        if (!song) {
            serverQueue.voiceChannel.leave();
            global.queue.delete(this.guildId);
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url, { filter: 'audioonly' }))
            .on('finish', () => {
                serverQueue.songs.shift();
                this.play(serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));

        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`Now playing: ${song.title}`);
        
        serverQueue.textChannel.send({ embeds: [embed] });
    }

    async addSong(song, message) {
        const serverQueue = global.queue.get(this.guildId);

        if (!serverQueue) {
            this.textChannel = message.channel;
            this.voiceChannel = message.member.voice.channel;

            const queueConstruct = {
                textChannel: this.textChannel,
                voiceChannel: this.voiceChannel,
                connection: null,
                songs: [],
                volume: this.volume,
                playing: true
            };

            global.queue.set(this.guildId, queueConstruct);

            try {
                const connection = await this.voiceChannel.join();
                queueConstruct.connection = connection;
                this.play(song);
            } catch (err) {
                console.error(err);
                global.queue.delete(this.guildId);
                return message.channel.send('Error connecting to the voice channel, please try again.');
            }
        }

        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`${song.title} has been added to the queue!`);

        return message.channel.send({ embeds: [embed] });
    }

    skip() {
        const serverQueue = global.queue.get(this.guildId);

        if (!serverQueue) return;

        if (serverQueue.songs.length <= 1) {
            serverQueue.songs = [];
            serverQueue.connection.disconnect();
            return serverQueue.textChannel.send('No more songs in the queue. Music has stopped.');
        } else {
            serverQueue.songs.shift();
            this.play(serverQueue.songs[0]);
        }
    }

    stop() {
        const serverQueue = global.queue.get(this.guildId);

        if (!serverQueue) return;

        serverQueue.songs = [];
        serverQueue.connection.disconnect();
        return serverQueue.textChannel.send('Music has been stopped and the queue has been cleared!');
    }

    pause() {
        const serverQueue = global.queue.get(this.guildId);

        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return serverQueue.textChannel.send('Music has been paused!');
        } else {
            return serverQueue.textChannel.send('Music is already paused.');
        }
    }

    resume() {
        const serverQueue = global.queue.get(this.guildId);

        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return serverQueue.textChannel.send('Music has been resumed!');
        } else {
            return serverQueue.textChannel.send('Music is already playing.');
        }

    }

    setVolume(volumeLevel) {
        const serverQueue = global.queue.get(this.guildId);

        if (!serverQueue) return 'No music currently playing.';

        if (volumeLevel < 0 || volumeLevel > 100) {
            return 'Volume must be between 0 and 100.';
        }

        serverQueue.volume = volumeLevel;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(volumeLevel / 100);
        return `Volume set to ${volumeLevel}.`;
    }

    getQueue() {
        const serverQueue = global.queue.get(this.guildId);

        if (!serverQueue) return 'There is no music playing in the queue.';

        const queueList = serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n');
        return new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Current Music Queue')
            .setDescription(queueList);
    }
}

module.exports = QueueService;