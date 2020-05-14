const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.isAuthenticated = (req, res) => {};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // In case if user doesnt have any token
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token is expired or not valid: ', err);
      res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Temp storage for refresh tokens
let refreshTokens = [];

exports.loginUser = (req, res) => {
  // Authenticate User

  const email = req.body.email;
  const userId = req.body.userId;
  const user = { email: email, userId: userId };

  // Add JWT to header of request
  const accessToken = generateaccessToken(user);
  const refreshToken = generaterefreshToken(user);

  // Save refresh token to storage of tokens
  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

exports.createRefreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    const tempUser = { email: user.email, userId: user.userId };
    const accessToken = generateaccessToken(tempUser);
    res.json({ accessToken: accessToken });
  });
};

exports.deleteRefreshToken = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

function generateaccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN_TIME,
  });
}

function generaterefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}
