const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuModel = new Schema({
  name: String,
  description: String,
  restaurantId: String,
});

module.exports = mongoose.model('Menu', MenuModel);
