const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controllers/auth-controller');
const jwtController = require('../controllers/auth-controllers/jwt-controller');

// router.get('/login', authController.isUserSignedIn);
router.post('/login', authController.loginUser);
router.get('/account', jwtController.authenticateToken, (req, res) =>
  res.send({ authUser: req.user })
);
router.post('/token', jwtController.refreshAccessToken);
router.delete('/logout', authController.logoutUser);

module.exports = router;
