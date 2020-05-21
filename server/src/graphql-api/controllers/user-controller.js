const User = require('../../models/user');
const { AuthorizationError } = require('../errors');

exports.getUserById = (userId) => {
  return User.findById(userId);
  //return _.find(authors, { id: parent.authorId });
};

exports.getUserByEmail = (userEmail, callback) => {
  return User.findOne({ email: userEmail }, (err, user) => {
    if (err) {
      throw new AuthorizationError({
        message: `User with ${email} doesnt exist!`,
      });
    }
    callback(user);
  });
};

exports.getAllUsers = () => {
  return User.find({});
};

exports.saveUser = (user, permission) => {
  let newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
    permission_role: permission,
  });
  return newUser.save();
};
