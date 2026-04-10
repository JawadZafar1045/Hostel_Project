const User = require('../models/User.model');
const Hostel = require('../models/Hostel.model');
const Inquiry = require('../models/Inquiry.model');
const ApiError = require('../utils/ApiError');

const getPlatformStats = async () => {
  const [
    totalOwners,
    activeOwners,
    totalHostels,
    pendingHostels,
    approvedHostels,
    rejectedHostels,
    viewsAggregation,
    inquiriesAggregation
  ] = await Promise.all([
    User.countDocuments({ role: 'owner' }),
    User.countDocuments({ role: 'owner', isActive: true }),
    Hostel.countDocuments(),
    Hostel.countDocuments({ status: 'pending' }),
    Hostel.countDocuments({ status: 'approved' }),
    Hostel.countDocuments({ status: 'rejected' }),
    Hostel.aggregate([{ $group: { _id: null, totalViews: { $sum: '$views' } } }]),
    Hostel.aggregate([{ $group: { _id: null, totalInquiries: { $sum: '$inquiries' } } }])
  ]);

  const totalViews = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;
  const totalInquiries = inquiriesAggregation.length > 0 ? inquiriesAggregation[0].totalInquiries : 0;

  return {
    owners: {
      total: totalOwners,
      active: activeOwners
    },
    hostels: {
      total: totalHostels,
      pending: pendingHostels,
      approved: approvedHostels,
      rejected: rejectedHostels
    },
    engagement: {
      totalViews,
      totalInquiries
    }
  };
};

const createAdmin = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already in use');
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: 'admin'
  });

  const adminObj = admin.toObject();
  delete adminObj.password;

  return adminObj;
};

const getAllOwners = async (filters) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { role: 'owner' };
  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive === 'true';
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const [owners, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).select('-password'),
    User.countDocuments(query)
  ]);

  return {
    owners,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getOwnerById = async (ownerId) => {
  const owner = await User.findOne({ _id: ownerId, role: 'owner' }).select('-password');
  if (!owner) {
    throw new ApiError(404, 'Owner not found');
  }
  return owner;
};

const toggleOwnerStatus = async (ownerId) => {
  const owner = await User.findOne({ _id: ownerId, role: 'owner' });
  if (!owner) {
    throw new ApiError(404, 'Owner not found');
  }

  owner.isActive = !owner.isActive;
  await owner.save();
  
  const ownerObj = owner.toObject();
  delete ownerObj.password;
  return ownerObj;
};

const deleteOwner = async (ownerId) => {
  const owner = await User.findOne({ _id: ownerId, role: 'owner' });
  if (!owner) {
    throw new ApiError(404, 'Owner not found');
  }

  await User.findByIdAndDelete(ownerId);
  await Hostel.deleteMany({ owner: ownerId }); // Also delete all hostels where owner = ownerId

  return null;
};

const getAllHostels = async (filters) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.city) query['location.city'] = filters.city;
  if (filters.type) query.type = filters.type;

  const [hostels, total] = await Promise.all([
    Hostel.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Hostel.countDocuments(query)
  ]);

  return {
    hostels,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getHostelById = async (hostelId) => {
  const hostel = await Hostel.findById(hostelId).populate('owner', 'name email');
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }
  return hostel;
};

const updateHostelStatus = async (hostelId, status) => {
  if (!['approved', 'rejected'].includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }

  hostel.status = status;
  await hostel.save();

  return hostel;
};

const toggleHostelFeatured = async (hostelId) => {
  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }

  // Flip the boolean
  hostel.isFeatured = hostel.isFeatured === undefined ? true : !hostel.isFeatured;
  await hostel.save();

  return hostel;
};

const deleteHostel = async (hostelId) => {
  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    throw new ApiError(404, 'Hostel not found');
  }

  await Hostel.findByIdAndDelete(hostelId);
  return null;
};

const getAllInquiries = async (filters) => {
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};
  if (filters.status) query.status = filters.status;

  const [inquiries, total] = await Promise.all([
    Inquiry.find(query)
      .populate('hostel', 'title location.city')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Inquiry.countDocuments(query)
  ]);

  return {
    inquiries,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

module.exports = {
  getPlatformStats,
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
