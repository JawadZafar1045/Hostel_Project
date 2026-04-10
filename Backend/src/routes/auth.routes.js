const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const { verifyJWT } = require('../middlewares/auth.middleware');
const {
  register,
  login,
  logout,
  getMe,
  changePassword
} = require('../controllers/auth.controller');

const router = express.Router();

// Validation Rules
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  // SECURITY FIX: NO role field validation handled here; role is automatically assigned by the service.
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateChangePassword = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
];

// Public Routes
router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

// Protected Routes
router.post('/logout', verifyJWT, logout);
router.get('/me', verifyJWT, getMe);
router.patch('/change-password', validateChangePassword, verifyJWT, validate, changePassword);

module.exports = router;
