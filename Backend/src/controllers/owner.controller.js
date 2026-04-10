const ownerService = require('../services/owner.service');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');

const createHostel = asyncHandler(async (req, res) => {
  const hostel = await ownerService.createHostel(req.user._id, req.body);
  return res.status(201).json(
    new ApiResponse(201, hostel, "Hostel submitted for review")
  );
});

const getMyHostels = asyncHandler(async (req, res) => {
  const hostels = await ownerService.getOwnerHostels(req.user._id);
  return res.status(200).json(
    new ApiResponse(200, hostels, "Hostels fetched successfully")
  );
});

const getMyHostelById = asyncHandler(async (req, res) => {
  const hostel = await ownerService.getOwnerHostelById(req.params.id, req.user._id);
  return res.status(200).json(
    new ApiResponse(200, hostel, "Hostel fetched successfully")
  );
});

const updateMyHostel = asyncHandler(async (req, res) => {
  const hostel = await ownerService.updateOwnerHostel(req.params.id, req.user._id, req.body);
  return res.status(200).json(
    new ApiResponse(200, hostel, "Hostel updated successfully")
  );
});

const deleteMyHostel = asyncHandler(async (req, res) => {
  await ownerService.deleteOwnerHostel(req.params.id, req.user._id);
  return res.status(200).json(
    new ApiResponse(200, null, "Hostel deleted successfully")
  );
});

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await ownerService.getOwnerDashboard(req.user._id);
  return res.status(200).json(
    new ApiResponse(200, dashboard, "Dashboard fetched successfully")
  );
});

const getMyInquiries = asyncHandler(async (req, res) => {
  const inquiries = await ownerService.getOwnerInquiries(req.user._id);
  return res.status(200).json(
    new ApiResponse(200, inquiries, "Inquiries fetched successfully")
  );
});

const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await ownerService.updateInquiryStatus(req.params.id, req.user._id, req.body.status);
  return res.status(200).json(
    new ApiResponse(200, inquiry, "Inquiry updated successfully")
  );
});

module.exports = {
  createHostel,
  getMyHostels,
  getMyHostelById,
  updateMyHostel,
  deleteMyHostel,
  getDashboard,
  getMyInquiries,
  updateInquiryStatus
};
