const winston = require('../config/logger.js');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  winston.error(err.message, err);

  // Determine the error status code
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler; 
