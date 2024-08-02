const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true, // Duration in seconds
    },
    requestedBy: {
        type: String,
        required: false, // Optional, can record the user who requested the song
    },
}, {
    timestamps: true // Automatically manages createdAt and updatedAt fields
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;