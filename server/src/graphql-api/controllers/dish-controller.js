const Dish = require('../../models/dish');

exports.getDishById = (dishId) => {
  return Dish.findById(dishId);
};

exports.getAllDishes = () => {
  return Dish.find({});
};

exports.getDishesByCategoryId = (categoryId) => {
  return Dish.find({ categoryId: categoryId });
  //return _.filter(books, { authorId: parent.id });
};

exports.saveDish = (dish) => {
  let newDish = new Dish({
    name: dish.name,
    description: dish.description,
    price: dish.price,
    image: dish.image,
    categoryId: dish.categoryId,
  });
  return newDish.save();
};
