const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
  level: 'info', // Log level (error, warn, info, verbose, debug)
  format: format.combine(
    format.timestamp(), // Add timestamp
    format.json() // Format logs in JSON
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
    new transports.File({ filename: 'logs/combined.log' }) // All logs
  ]
});

// If not in production, log to console in readable format
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

module.exports = logger;
