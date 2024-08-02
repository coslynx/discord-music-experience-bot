const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true // Ensure each user has a unique ID
    },
    username: {
        type: String,
        required: true
    },
    listeningHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song' // Reference to the Song model
    }]
}, {
    timestamps: true // Automatically manages createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;