const adminService = require('../services/admin.service');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');

const getDashboard = asyncHandler(async (req, res) => {
  const stats = await adminService.getPlatformStats();
  
  return res.status(200).json(
    new ApiResponse(200, stats, "Dashboard fetched successfully")
  );
});

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = await adminService.createAdmin(name, email, password);
  
  return res.status(201).json(
    new ApiResponse(201, user, "Admin created successfully")
  );
});

const getAllOwners = asyncHandler(async (req, res) => {
  const result = await adminService.getAllOwners(req.query);
  
  return res.status(200).json(
    new ApiResponse(200, result, "Owners fetched successfully")
  );
});

const getOwnerById = asyncHandler(async (req, res) => {
  const owner = await adminService.getOwnerById(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, owner, "Owner fetched successfully")
  );
});

const toggleOwnerStatus = asyncHandler(async (req, res) => {
  const owner = await adminService.toggleOwnerStatus(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, owner, "Owner status updated successfully")
  );
});

const deleteOwner = asyncHandler(async (req, res) => {
  await adminService.deleteOwner(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, null, "Owner deleted successfully")
  );
});

const getAllHostels = asyncHandler(async (req, res) => {
  const result = await adminService.getAllHostels(req.query);
  
  return res.status(200).json(
    new ApiResponse(200, result, "Hostels fetched successfully")
  );
});

const getHostelById = asyncHandler(async (req, res) => {
  const hostel = await adminService.getHostelById(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, hostel, "Hostel fetched successfully")
  );
});

const updateHostelStatus = asyncHandler(async (req, res) => {
  const hostel = await adminService.updateHostelStatus(req.params.id, req.body.status);
  
  return res.status(200).json(
    new ApiResponse(200, hostel, "Hostel status updated successfully")
  );
});

const toggleHostelFeatured = asyncHandler(async (req, res) => {
  const hostel = await adminService.toggleHostelFeatured(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, hostel, "Hostel featured status updated")
  );
});

const deleteHostel = asyncHandler(async (req, res) => {
  await adminService.deleteHostel(req.params.id);
  
  return res.status(200).json(
    new ApiResponse(200, null, "Hostel deleted successfully")
  );
});

const getAllInquiries = asyncHandler(async (req, res) => {
  const result = await adminService.getAllInquiries(req.query);
  
  return res.status(200).json(
    new ApiResponse(200, result, "Inquiries fetched successfully")
  );
});

module.exports = {
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
};
