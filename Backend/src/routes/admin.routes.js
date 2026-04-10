const express = require('express');
const { body } = require('express-validator');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const {
  getDashboard,
  createAdmin,
  getAllOwners,
  getOwnerById,
  toggleOwnerStatus,
  deleteOwner,
  getAllHostels,
  getHostelById,
  updateHostelStatus,
  toggleHostelFeatured,
  deleteHostel,
  getAllInquiries
} = require('../controllers/admin.controller');

const router = express.Router();

// Apply auth middlewares to all admin routes
router.use(verifyJWT);
router.use(authorizeRoles('admin'));

// Validation Rules
const validateCreateAdmin = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

const validateUpdateHostelStatus = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected')
];

// Dashboard Route
router.get('/dashboard', getDashboard);

// Admin Management Routes
router.post('/admins', validateCreateAdmin, validate, createAdmin);

// Owner Management Routes
router.get('/owners', getAllOwners);
router.get('/owners/:id', getOwnerById);
router.patch('/owners/:id/toggle', toggleOwnerStatus);
router.delete('/owners/:id', deleteOwner);

// Hostel Management Routes
router.get('/hostels', getAllHostels);
router.get('/hostels/:id', getHostelById);
router.patch('/hostels/:id/status', validateUpdateHostelStatus, validate, updateHostelStatus);
router.patch('/hostels/:id/feature', toggleHostelFeatured);
router.delete('/hostels/:id', deleteHostel);

// Inquiry Management Routes
router.get('/inquiries', getAllInquiries);

module.exports = router;
