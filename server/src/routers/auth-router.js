const express = require('express');
const router = express.Router();
const authController = require('../rest-api/controllers/auth-controllers/auth-controller');
const jwtController = require('../rest-api/controllers/auth-controllers/jwt-controller');

router.get('/login', authController.isUserSignedIn);
router.post('/login', authController.loginUser);
router.post('/token', jwtController.refreshAccessToken);
router.delete('/logout', authController.logoutUser);

module.exports = router;
