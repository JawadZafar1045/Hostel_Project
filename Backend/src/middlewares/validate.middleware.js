const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * @description Middleware to process validation results from express-validator.
 * Throws ApiError with detailed validation messages if verification fails.
 */
const validate = (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    throw new ApiError(400, "Validation Error", errorMessages);
  }
  next();
};

module.exports = validate;
