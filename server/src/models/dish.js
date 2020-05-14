const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishyModel = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  categoryId: String,
});

module.exports = mongoose.model('Dish', DishyModel);
