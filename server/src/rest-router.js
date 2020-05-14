const express = require('express');
const router = express.Router();
const userController = require('./rest-api/controllers/user-controller');
const restaurantController = require('./rest-api/controllers/restaurant-contorller');
const authentificationController = require('./rest-api/controllers/authentification-controller');

router.get(
  '/users',
  authentificationController.authenticateToken,
  userController.getUsers
);

router.get(
  '/restaurants-by-permission',
  authentificationController.authenticateToken,
  restaurantController.getRestaurantsByPermission
);
router.get('/restaurants', restaurantController.getRestaurants);

module.exports = router;
