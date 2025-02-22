const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(), 
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
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
