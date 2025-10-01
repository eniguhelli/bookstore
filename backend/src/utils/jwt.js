const jwt = require('jsonwebtoken');

const createAccessToken = (user) => {
  return jwt.sign({ id: user._id || user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' });
};

const createRefreshToken = (user) => {
  return jwt.sign({ id: user._id || user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' });
};

module.exports = { createAccessToken, createRefreshToken };
