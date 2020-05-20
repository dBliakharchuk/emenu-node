const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const axios = require('axios');

// Temp storage for refresh tokens
let refreshTokens = [];

exports.refreshAccessToken = (req, res) => {
  // Get refresh token from cookies
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  // Encode refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // Set header on Forbidden in case of wrong secret key...
    if (err) return res.sendStatus(403);

    // Get data from token
    const tempUser = {
      email: user.email,
      password: user.password,
      userId: user.userId,
    };

    // Generate access token with data from refreshToken
    const accessToken = generateaccessToken(tempUser);

    // Save access token in cookies
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.json({ accessToken: accessToken });
  });
};

// Authenticate if Access Token still valid
// In possitive case return user data by request
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token is expired or not valid: You need to sign in!');
      return res.sendStatus(403);
    }
    req.user = user;
    console.log('authenticateToken: ', user);
    next();
  });
};

// Refresh access to user account
// It will be implemented from client side
exports.refreshAccess = (req, res, next) => {
  axios({
    method: 'post',
    url: 'http://localhost:4001/token',
    data: {
      token: req.cookies.token,
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => next())
    .catch((err) => console.log('You lost access! Sign in again'));
};

exports.generateaccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN_TIME,
  });
};

exports.generaterefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

exports.pushRefreshTokenToStorage = (refreshToken) => {
  refreshTokens.push(refreshToken);
};

exports.removeRefreshTokenToStorage = (refreshToken) => {
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
};
