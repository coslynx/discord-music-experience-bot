const { Client, Intents } = require('discord.js');
const { MongoClient } = require('mongodb');
const { DISCORD_TOKEN, MONGO_URI } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.queue = new Map();

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    try {
        const mongoClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }

    client.user.setActivity('Your favorite songs!', { type: 'LISTENING' });
});

client.login(DISCORD_TOKEN);