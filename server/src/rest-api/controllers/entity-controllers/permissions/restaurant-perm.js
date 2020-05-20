const { PERMISSION_TYPE } = require('../../../../static/data');

exports.canViewRestaurant = (user, restaurant) => {
  return (
    user.permission_role === PERMISSION_TYPE.ADMIN_ROLE ||
    restaurant.userId === user._id
  );
};

exports.canDeleteRestaurant = (user, restaurant) => {
  return (
    user.permission_role === PERMISSION_TYPE.ADMIN_ROLE ||
    restaurant.userId === user._id
  );
};

exports.scopedRestaurants = (user, restaurants) => {
  if (user.permission_role === PERMISSION_TYPE.ADMIN_ROLE) return restaurants;
  return restaurants.filter((restaurant) => restaurant.userId === user._id);
};
