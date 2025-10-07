const User = require('../models/User');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validations/authValidation');

// Register user
exports.register = async (req, res) => {

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToke, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

// Login user
exports.login = async (req, res) => {

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

// Refresh token
exports.refresh = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = createAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out' });
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Update user
exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json(updatedUser);
};

// Delete user
exports.deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully' });
};
