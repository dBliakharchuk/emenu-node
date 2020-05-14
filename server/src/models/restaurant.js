const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantModel = new Schema({
  name: String,
  address: String,
  userId: String,
});

module.exports = mongoose.model('Restaurant', restaurantModel);
