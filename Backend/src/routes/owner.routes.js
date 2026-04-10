const express = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { validateCreateHostel, validateUpdateHostel } = require('../validators/owner.validator');
const {
  createHostel,
  getMyHostels,
  getMyHostelById,
  updateMyHostel,
  deleteMyHostel,
  getDashboard,
  getMyInquiries,
  updateInquiryStatus
} = require('../controllers/owner.controller');

const router = express.Router();

// Apply auth middlewares to all routes
router.use(verifyJWT);
router.use(authorizeRoles('owner'));

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------

// Dashboard needs to be defined BEFORE /hostels/:id to avoid conflict
router.get('/dashboard', getDashboard);

// Hostel Routes
router.get('/hostels', getMyHostels);
router.post('/hostels', validateCreateHostel, validate, createHostel);

router.get('/hostels/:id', getMyHostelById);
router.patch('/hostels/:id', validateUpdateHostel, validate, updateMyHostel);
router.delete('/hostels/:id', deleteMyHostel);

// Inquiry Routes
router.get('/inquiries', getMyInquiries);
router.patch('/inquiries/:id', updateInquiryStatus);

module.exports = router;
