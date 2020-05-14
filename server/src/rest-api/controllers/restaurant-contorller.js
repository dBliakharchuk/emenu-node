const Restaurant = require('../../models/restaurant');

exports.getRestaurantsByPermission = (request, response) => {
  //   console.log(request.user);
  Restaurant.find(
    {
      userId: request.user.userId,
    },
    (err, result) => {
      response.json(result);
    }
  );
};

exports.getRestaurants = (request, response) => {
  //   console.log(request.user);
  Restaurant.find({}, (err, result) => {
    response.json(result);
  });
};
