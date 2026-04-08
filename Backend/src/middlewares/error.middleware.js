const ApiError = require('../utils/ApiError');
const env = require('../config/env');

/**
 * @description Global Error Handling Middleware.
 * Standardizes all error responses sent to the client.
 */
const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Final response structure
  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(env.NODE_ENV === 'development' && { stack: error.stack }), // Only show stack in dev
  };

  res.status(error.statusCode).json(response);
};

module.exports = errorMiddleware;
