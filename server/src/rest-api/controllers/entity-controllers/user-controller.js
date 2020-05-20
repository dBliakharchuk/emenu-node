const User = require('../../../models/user');

exports.getUsers = (request, resonse) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('Error while fetching users');
    }
    resonse.json(users);
  });
};
