const PlaylistModel = require('../models/playlistModel');
const UserService = require('./userService');

class PlaylistService {
    static async createPlaylist(userId, playlistName) {
        const playlist = new PlaylistModel({
            userId: userId,
            name: playlistName,
            songs: []
        });
        return await playlist.save();
    }

    static async addSongToPlaylist(userId, playlistName, songId) {
        const playlist = await PlaylistModel.findOne({ userId: userId, name: playlistName });
        if (!playlist) {
            throw new Error(`Playlist "${playlistName}" does not exist.`);
        }
        if (playlist.songs.includes(songId)) {
            throw new Error(`Song with ID "${songId}" is already in the playlist "${playlistName}".`);
        }
        playlist.songs.push(songId);
        await playlist.save();
    }

    static async removeSongFromPlaylist(userId, playlistName, songId) {
        const playlist = await PlaylistModel.findOne({ userId: userId, name: playlistName });
        if (!playlist) {
            throw new Error(`Playlist "${playlistName}" does not exist.`);
        }
        const songIndex = playlist.songs.indexOf(songId);
        if (songIndex === -1) {
            throw new Error(`Song with ID "${songId}" is not found in the playlist "${playlistName}".`);
        }
        playlist.songs.splice(songIndex, 1);
        await playlist.save();
    }

    static async getSongsFromPlaylist(userId, playlistName) {
        const playlist = await PlaylistModel.findOne({ userId: userId, name: playlistName });
        if (!playlist) {
            throw new Error(`Playlist "${playlistName}" does not exist.`);
        }
        return playlist.songs;
    }

    static async checkPlaylistExists(userId, playlistName) {
        const playlist = await PlaylistModel.findOne({ userId: userId, name: playlistName });
        return playlist !== null;
    }
}

module.exports = PlaylistService;