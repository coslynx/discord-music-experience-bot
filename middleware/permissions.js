const { MessageEmbed } = require('discord.js');

const permissionsMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.member.roles.cache.map(role => role.id);
        
        const hasPermission = allowedRoles.some(role => userRoles.includes(role));

        if (!hasPermission) {
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Permission Denied')
                .setDescription('You do not have permission to use this command.');

            return res.status(403).send({ embeds: [embed] });
        }

        next();
    };
};

module.exports = permissionsMiddleware;