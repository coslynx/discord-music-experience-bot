const Logger = require('../utils/logger');

const loggingMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    
    Logger.info(`[${timestamp}] ${method} request to ${url}`);

    res.on('finish', () => {
        const responseTime = Date.now() - req.startTime;
        Logger.info(`[${timestamp}] ${method} request to ${url} completed - Status: ${res.statusCode} - Response Time: ${responseTime}ms`);
    });

    next();
};

module.exports = loggingMiddleware;