const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: String,
  email: String,
  password: String,
  permission_role: String,
});

module.exports = mongoose.model('User', userModel);
