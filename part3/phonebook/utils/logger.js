const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf, colorize } = format;

const consoleLogFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        colorize(),
        consoleLogFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "app.log" }),
    ],
});

module.exports = logger;