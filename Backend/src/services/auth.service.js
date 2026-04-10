const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already in use');
  }

  // Security Fix: Always hardcode role as 'owner' for public registration
  const user = await User.create({
    name,
    email,
    password,
    role: 'owner'
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Security Fix: Prevent deactivated users from logging in
  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Contact support.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, accessToken };
};

const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Incorrect old password');
  }

  user.password = newPassword;
  await user.save(); // pre-save hook handles hashing

  return null;
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  changePassword
};
