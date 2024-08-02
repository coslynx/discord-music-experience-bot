const express = require('express');
const { MessageEmbed } = require('discord.js');
const MusicService = require('../services/musicService');
const { handleErrors } = require('../utils/errorHandler');
const router = express.Router();

// Middleware for rate limiting could be added here in the future

router.post('/play', async (req, res) => {
    const { guildId, songUrl } = req.body;

    if (!guildId || !songUrl) {
        return res.status(400).json({ message: 'Guild ID and song URL are required.' });
    }

    try {
        const response = await MusicService.play(guildId, songUrl);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

router.post('/skip', async (req, res) => {
    const { guildId } = req.body;

    if (!guildId) {
        return res.status(400).json({ message: 'Guild ID is required.' });
    }

    try {
        await MusicService.skip(guildId);
        return res.status(200).json({ message: 'Skipped the current song.' });
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

router.post('/stop', async (req, res) => {
    const { guildId } = req.body;

    if (!guildId) {
        return res.status(400).json({ message: 'Guild ID is required.' });
    }

    try {
        await MusicService.stop(guildId);
        return res.status(200).json({ message: 'Music stopped and queue cleared.' });
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

router.post('/pause', async (req, res) => {
    const { guildId } = req.body;

    if (!guildId) {
        return res.status(400).json({ message: 'Guild ID is required.' });
    }

    try {
        await MusicService.pause(guildId);
        return res.status(200).json({ message: 'Music paused.' });
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

router.post('/resume', async (req, res) => {
    const { guildId } = req.body;

    if (!guildId) {
        return res.status(400).json({ message: 'Guild ID is required.' });
    }

    try {
        await MusicService.resume(guildId);
        return res.status(200).json({ message: 'Music resumed.' });
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

router.get('/queue', async (req, res) => {
    const { guildId } = req.query;

    if (!guildId) {
        return res.status(400).json({ message: 'Guild ID is required.' });
    }

    try {
        const queue = await MusicService.getCurrentQueue(guildId);
        return res.status(200).json(queue);
    } catch (error) {
        console.error(error);
        handleErrors(error, res);
    }
});

module.exports = router;