/**
 * @description A higher-order function that wraps asynchronous Express route handlers
 * to catch errors and pass them to the global error middleware.
 * Eliminates the need for try-catch blocks in every controller.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
