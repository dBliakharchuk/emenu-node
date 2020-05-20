const Restaurant = require('../../../models/restaurant');
const restaurantPermission = require('./permissions/restaurant-perm');

exports.getRestaurantsByPermission = (request, response) => {
  Restaurant.find(
    {
      userId: request.user.userId,
    },
    (err, result) => {
      response.json(result);
    }
  );
};

exports.getRestaurantById = (request, response) => {
  Restaurant.find({ _id: request.body.id }, (err, result) => {
    response.json(result);
  });
};

exports.deleteRestaurant = (req, res) => {
  console.log(req.restaurant);
  Restaurant.deleteOne({ _id: req.restaurant._id }, (err, result) => {
    if (err) res.json('Deleted restaurant error!');
    res.json('Restaurant was deleted! result!');
  });
};

exports.authPermToRest = (req, res, next) => {
  if (!restaurantPermission.canViewRestaurant(req.user, req.restaurant)) {
    res.status(401);
    return res.send('Not Allowed!');
  }
  next();
};

exports.authDeleteRestaurant = (req, res, next) => {
  if (!restaurantPermission.canDeleteRestaurant(req.user, req.restaurant)) {
    res.status(401);
    return res.send('Not Allowed to Delete this Restaurant!');
  }
  next();
};

exports.getRestaurants = async (request, response) => {
  let restaurants = null;
  await getRestaurants((foundRestaurants) => (restaurants = foundRestaurants));
  response.json(
    restaurantPermission.scopedRestaurants(request.user, restaurants)
  );
};

exports.loadRestaurantFromReq = (req, res) => {
  res.json(req.restaurant);
};

exports.setRestaurantToReq = async (req, res, next) => {
  const restaurantId = req.params.restaurantId;
  console.log(restaurantId);
  await getRestaurantById(
    restaurantId,
    (restaurant) => (req.restaurant = restaurant)
  );
  if (req.restaurant == null) {
    res.status(404);
    return res.send(
      `You dont have access to restaurant with id: ${restaurantId}`
    );
  }
  next();
};

async function getRestaurantById(restaurantId, callback) {
  await Restaurant.findOne({ _id: restaurantId }, (err, restaurant) => {
    if (err) {
      console.log(`Restaurant with ${restaurantId} not found!`);
      return null;
    }
    callback(restaurant);
  });
}

async function getRestaurants(callback) {
  await Restaurant.find({}, (err, restaurants) => {
    if (err) {
      console.log(`Restaurants were not found!`);
      return null;
    }
    callback(restaurants);
  });
}
