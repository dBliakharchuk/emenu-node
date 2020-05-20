const express = require('express');
const router = express.Router();
const userController = require('../rest-api/controllers/entity-controllers/user-controller');
const homeController = require('../rest-api/controllers/entity-controllers/home-controller');
const restaurantController = require('../rest-api/controllers/entity-controllers/restaurant-contorller');
const authController = require('../rest-api/controllers/auth-controllers/auth-controller');
const jwtController = require('../rest-api/controllers/auth-controllers/jwt-controller');
const { PERMISSION_TYPE } = require('../static/data');

router.get('/', homeController.loadHomePage);
router.get(
  '/users',
  jwtController.authenticateToken,
  authController.authRole(PERMISSION_TYPE.ADMIN_ROLE),
  userController.getUsers
);

router.get(
  '/restaurants-by-permission',
  jwtController.refreshAccess,
  jwtController.authenticateToken,
  restaurantController.getRestaurantsByPermission
);
router.get(
  '/restaurants',
  jwtController.authenticateToken,
  restaurantController.getRestaurants
);
router.get('/restaurant', restaurantController.getRestaurantById);
router.get(
  '/restaurants/:restaurantId',
  restaurantController.setRestaurantToReq,
  jwtController.authenticateToken,
  restaurantController.authPermToRest,
  restaurantController.loadRestaurantFromReq
);

router.delete(
  '/restaurants/:restaurantId',
  restaurantController.setRestaurantToReq,
  jwtController.authenticateToken,
  restaurantController.authDeleteRestaurant,
  restaurantController.deleteRestaurant
);

module.exports = router;
