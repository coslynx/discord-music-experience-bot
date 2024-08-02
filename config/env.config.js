const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/discord-music-bot',
    DB_USER: process.env.DB_USER || 'yourUsername',
    DB_PASS: process.env.DB_PASS || 'yourPassword',
    DISCORD_TOKEN: process.env.DISCORD_TOKEN || 'yourDiscordBotToken',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 'yourYouTubeDataAPIKey',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || 'yourSpotifyClientID',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || 'yourSpotifyClientSecret',
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID || 'yourSoundCloudClientID',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/musicBotDb',
    SESSION_SECRET: process.env.SESSION_SECRET || 'yourSessionSecretForExpress',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    FFMPEG_PATH: process.env.FFMPEG_PATH || 'path/to/ffmpeg',
    CACHE_TIME: process.env.CACHE_TIME || 3600,
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
};

module.exports = config;