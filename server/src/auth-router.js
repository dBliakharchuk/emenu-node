const express = require('express');
const router = express.Router();
const authentificationController = require('./rest-api/controllers/authentification-controller');

router.get('/login', authentificationController.isAuthenticated);
router.post('/login', authentificationController.loginUser);
router.post('/token', authentificationController.createRefreshToken);
router.delete('/logout', authentificationController.deleteRefreshToken);

module.exports = router;
