const express = require('express');
const router = express.Router();
const userController = require('../controllers/entity-controllers/user-controller');
const homeController = require('../controllers/entity-controllers/home-controller');
const restaurantController = require('../controllers/entity-controllers/restaurant-contorller');
const authController = require('../controllers/auth-controllers/auth-controller');
const jwtController = require('../controllers/auth-controllers/jwt-controller');
const { PERMISSION_TYPE } = require('../../static/data');

// User router
router.get('/', homeController.loadHomePage);

// router.get(
//   '/users',
//   jwtController.authenticateToken,
//   //authController.authRole(PERMISSION_TYPE.ADMIN_ROLE),
//   userController.getUsers
// );

router.get('/users', jwtController.authenticateToken, userController.getUsers);

router.get(
  '/user',
  jwtController.authenticateToken,
  userController.getUserById
);

// Restaurant router
router.get(
  '/restaurants-by-permission',
  jwtController.refreshAccess,
  jwtController.authenticateTokenFromCookies,
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
  jwtController.authenticateTokenFromCookies,
  restaurantController.authPermToRest,
  restaurantController.loadRestaurantFromReq
);

router.delete(
  '/restaurants/:restaurantId',
  restaurantController.setRestaurantToReq,
  jwtController.authenticateTokenFromCookies,
  restaurantController.authDeleteRestaurant,
  restaurantController.deleteRestaurant
);

module.exports = router;
