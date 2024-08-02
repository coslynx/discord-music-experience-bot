const { MessageEmbed } = require('discord.js');
const PlaylistService = require('../services/playlistService');
const UserService = require('../services/userService');

module.exports = {
    name: 'playlist',
    description: 'Manages your custom playlists.',
    async execute(message, args) {
        const member = message.member;
        const action = args[0];

        if (!action) {
            return message.reply('Please specify an action: create, add, remove, or view.');
        }

        switch (action.toLowerCase()) {
            case 'create':
                const playlistName = args.slice(1).join(' ');
                if (!playlistName) {
                    return message.reply('Please provide a name for the playlist.');
                }
                try {
                    await PlaylistService.createPlaylist(member.id, playlistName);
                    message.reply(`Playlist "${playlistName}" created successfully!`);
                } catch (error) {
                    console.error(error);
                    message.reply('An error occurred while creating the playlist. Please try again.');
                }
                break;

            case 'add':
                const [playlistToAdd, songId] = args.slice(1);
                if (!playlistToAdd || !songId) {
                    return message.reply('Please specify a playlist name and a song ID to add.');
                }
                try {
                    const playlistExists = await PlaylistService.checkPlaylistExists(member.id, playlistToAdd);
                    if (!playlistExists) {
                        return message.reply(`Playlist "${playlistToAdd}" does not exist.`);
                    }
                    await PlaylistService.addSongToPlaylist(member.id, playlistToAdd, songId);
                    message.reply(`Song added to "${playlistToAdd}" successfully!`);
                } catch (error) {
                    console.error(error);
                    message.reply('An error occurred while adding the song to the playlist. Please try again.');
                }
                break;

            case 'remove':
                const [playlistToRemoveFrom, songToRemoveId] = args.slice(1);
                if (!playlistToRemoveFrom || !songToRemoveId) {
                    return message.reply('Please specify a playlist name and the song ID to remove.');
                }
                try {
                    const exists = await PlaylistService.checkPlaylistExists(member.id, playlistToRemoveFrom);
                    if (!exists) {
                        return message.reply(`Playlist "${playlistToRemoveFrom}" does not exist.`);
                    }
                    await PlaylistService.removeSongFromPlaylist(member.id, playlistToRemoveFrom, songToRemoveId);
                    message.reply(`Song removed from "${playlistToRemoveFrom}" successfully!`);
                } catch (error) {
                    console.error(error);
                    message.reply('An error occurred while removing the song from the playlist. Please try again.');
                }
                break;

            case 'view':
                const playlistToView = args[1];
                if (!playlistToView) {
                    return message.reply('Please specify a playlist name to view.');
                }
                try {
                    const songs = await PlaylistService.getSongsFromPlaylist(member.id, playlistToView);
                    if (songs.length === 0) {
                        return message.reply(`The playlist "${playlistToView}" is empty or does not exist.`);
                    }
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Songs in "${playlistToView}"`)
                        .setDescription(songs.map(song => `${song.title} - ${song.artist}`).join('\n'))
                        .setFooter('Use the commands to manage your playlists!');

                    message.channel.send({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    message.reply('An error occurred while retrieving the playlist. Please try again.');
                }
                break;

            default:
                message.reply('Invalid action. Please use create, add, remove, or view.');
                break;
        }
    }
};