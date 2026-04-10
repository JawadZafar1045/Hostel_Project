const authService = require('../services/auth.service');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');

const register = asyncHandler(async (req, res) => {
  // Extract ONLY name, email, password (ignores role entirely)
  const { name, email, password } = req.body;
  
  const user = await authService.registerUser(name, email, password);
  
  return res.status(201).json(
    new ApiResponse(201, user, "Registration successful")
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { user, accessToken } = await authService.loginUser(email, password);
  
  // Set HttpOnly cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie('accessToken', accessToken, cookieOptions);

  // Security Fix: NEVER include token in response body
  return res.status(200).json(
    new ApiResponse(200, user, "Login successful")
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  };

  res.clearCookie('accessToken', cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, null, "Logged out successfully")
  );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  await authService.changePassword(req.user._id, oldPassword, newPassword);

  return res.status(200).json(
    new ApiResponse(200, null, "Password changed successfully")
  );
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  changePassword
};
