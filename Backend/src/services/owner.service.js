const Hostel = require('../models/Hostel.model');
const Inquiry = require('../models/Inquiry.model');
const ApiError = require('../utils/ApiError');

const createHostel = async (ownerId, data) => {
  const hostelData = {
    ...data,
    owner: ownerId,
    postedBy: ownerId,
    status: 'pending' // Force status to pending
  };

  const hostel = await Hostel.create(hostelData);
  return hostel;
};

const getOwnerHostels = async (ownerId) => {
  const hostels = await Hostel.find({ owner: ownerId }).sort({ createdAt: -1 });
  return hostels;
};

const getOwnerHostelById = async (hostelId, ownerId) => {
  const hostel = await Hostel.findOne({ _id: hostelId, owner: ownerId });
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }
  return hostel;
};

const updateOwnerHostel = async (hostelId, ownerId, updateData) => {
  const hostel = await Hostel.findOne({ _id: hostelId, owner: ownerId });
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }

  // Strip restricted fields
  delete updateData.status;
  delete updateData.isFeatured;
  delete updateData.views;
  delete updateData.inquiries;
  delete updateData.owner;
  delete updateData.postedBy;

  // If hostel was rejected, reset to pending upon update
  if (hostel.status === 'rejected') {
    updateData.status = 'pending';
  }

  const updatedHostel = await Hostel.findByIdAndUpdate(
    hostelId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return updatedHostel;
};

const deleteOwnerHostel = async (hostelId, ownerId) => {
  const hostel = await Hostel.findOne({ _id: hostelId, owner: ownerId });
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }

  await Hostel.findByIdAndDelete(hostelId);
  return null;
};

const getOwnerDashboard = async (ownerId) => {
  const [
    totalListings,
    pendingListings,
    approvedListings,
    rejectedListings,
    viewsAggregation,
    inquiriesAggregation
  ] = await Promise.all([
    Hostel.countDocuments({ owner: ownerId }),
    Hostel.countDocuments({ owner: ownerId, status: 'pending' }),
    Hostel.countDocuments({ owner: ownerId, status: 'approved' }),
    Hostel.countDocuments({ owner: ownerId, status: 'rejected' }),
    Hostel.aggregate([
      { $match: { owner: ownerId } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]),
    Hostel.aggregate([
      { $match: { owner: ownerId } },
      { $group: { _id: null, totalInquiries: { $sum: '$inquiries' } } }
    ])
  ]);

  const totalViews = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;
  const totalInquiries = inquiriesAggregation.length > 0 ? inquiriesAggregation[0].totalInquiries : 0;

  return {
    totalListings,
    listingsByStatus: {
      pending: pendingListings,
      approved: approvedListings,
      rejected: rejectedListings
    },
    totalViews,
    totalInquiries
  };
};

const getOwnerInquiries = async (ownerId) => {
  const inquiries = await Inquiry.find({ owner: ownerId })
    .populate('hostel', 'title location.city')
    .sort({ createdAt: -1 });

  return inquiries;
};

const updateInquiryStatus = async (inquiryId, ownerId, status) => {
  const inquiry = await Inquiry.findOne({ _id: inquiryId, owner: ownerId });
  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found');
  }

  if (!['pending', 'contacted', 'closed'].includes(status)) {
    throw new ApiError(400, 'Invalid status update');
  }

  inquiry.status = status;
  await inquiry.save();
  
  return inquiry;
};

module.exports = {
  createHostel,
  getOwnerHostels,
  getOwnerHostelById,
  updateOwnerHostel,
  deleteOwnerHostel,
  getOwnerDashboard,
  getOwnerInquiries,
  updateInquiryStatus
};
