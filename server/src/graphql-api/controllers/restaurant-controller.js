const Restaurant = require('../../models/restaurant');

exports.getRestaurantById = (restaurantId) => {
  return Restaurant.findById(restaurantId);
};

exports.getAllRestaurants = () => {
  return Restaurant.find({});
};

exports.getRestaurantByUserId = (userId) => {
  return Restaurant.find({ userId: userId }, );
  //return _.filter(restaurants, { userId: parent.id });
};

exports.saveRestaurant = (restaurant) => {
  let newRestaurant = new Restaurant({
    name: restaurant.name,
    address: restaurant.address,
    userId: restaurant.userId,
  });
  return newRestaurant.save();
};
