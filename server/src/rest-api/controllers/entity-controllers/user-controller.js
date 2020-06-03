const User = require('../../../models/user');

exports.getUsers = (request, resonse) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('Error while fetching users');
    }
    resonse.json(users);
  });
};

exports.getUserById = (request, resonse) => {
  console.log('getUsersById: ', request.query.userId);
  User.findOne({ _id: request.query.userId }, (err, user) => {
    if (err) {
      console.log('Error while fetching users');
    }
    resonse.json(user);
  });
};

exports.getUserByEmail = async (userEmail, callback) => {
  await User.findOne({ email: userEmail }, (err, user) => {
    if (err) {
      console.log(`User with ${userEmail} not found!`);
      return null;
    }
    callback(user);
  });
};
