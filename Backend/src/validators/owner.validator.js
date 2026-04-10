const { body } = require('express-validator');

const validateCreateHostel = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['boys', 'girls', 'mixed']).withMessage('Type must be boys, girls, or mixed'),
  body('location.address')
    .notEmpty().withMessage('Address is required'),
  body('location.city')
    .notEmpty().withMessage('City is required'),
  body('price.monthly')
    .notEmpty().withMessage('Monthly price is required')
    .isNumeric().withMessage('Monthly price must be a number')
    .custom((value) => value >= 1).withMessage('Monthly price must be at least 1'),
  body('rooms.total')
    .notEmpty().withMessage('Total rooms is required')
    .isInt({ min: 1 }).withMessage('Total rooms must be an integer of at least 1'),
  body('rooms.available')
    .notEmpty().withMessage('Available rooms is required')
    .isInt({ min: 0 }).withMessage('Available rooms must be an integer of at least 0')
];

const validateUpdateHostel = [
  body('title')
    .optional()
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
  body('description')
    .optional()
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
  body('type')
    .optional()
    .isIn(['boys', 'girls', 'mixed']).withMessage('Type must be boys, girls, or mixed'),
  body('location.address')
    .optional()
    .notEmpty().withMessage('Address cannot be empty if provided'),
  body('location.city')
    .optional()
    .notEmpty().withMessage('City cannot be empty if provided'),
  body('price.monthly')
    .optional()
    .isNumeric().withMessage('Monthly price must be a number')
    .custom((value) => value >= 1).withMessage('Monthly price must be at least 1'),
  body('rooms.total')
    .optional()
    .isInt({ min: 1 }).withMessage('Total rooms must be an integer of at least 1'),
  body('rooms.available')
    .optional()
    .isInt({ min: 0 }).withMessage('Available rooms must be an integer of at least 0')
];

module.exports = {
  validateCreateHostel,
  validateUpdateHostel
};
