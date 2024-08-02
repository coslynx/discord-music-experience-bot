const jwt = require('jsonwebtoken');
const { MessageEmbed } = require('discord.js');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Authentication Required')
            .setDescription('You need to be logged in to access this feature.');

        return res.status(401).send({ embeds: [embed] });
    }

    jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
        if (err) {
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Invalid Token')
                .setDescription('Your authentication token is invalid or expired.');

            return res.status(403).send({ embeds: [embed] });
        }

        req.user = user; // Save user information to request
        next(); // Proceed to next middleware/controller
    });
};

module.exports = authenticate;