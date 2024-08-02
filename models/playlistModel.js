const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true, // ID of the user who owns the playlist
    },
    name: {
        type: String,
        required: true, // Name of the playlist
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song' // Reference to the Song model
    }]
}, {
    timestamps: true // Enables createdAt and updatedAt fields
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;