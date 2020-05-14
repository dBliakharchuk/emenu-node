const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
  name: String,
  description: String,
  menuId: String,
});

module.exports = mongoose.model('Category', CategoryModel);
