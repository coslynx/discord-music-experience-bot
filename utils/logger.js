const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logDirectory = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory, 'bot.log');

// Log levels
const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

// Logger class to encapsulate logging logic
class Logger {
    static log(message, level = LOG_LEVELS.INFO) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const logMessage = `[${timestamp}] [${level}] ${message}\n`;
        
        // Append the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });
    }

    static info(message) {
        this.log(message, LOG_LEVELS.INFO);
    }

    static warn(message) {
        this.log(message, LOG_LEVELS.WARN);
    }

    static error(message) {
        this.log(message, LOG_LEVELS.ERROR);
    }
}

module.exports = Logger;