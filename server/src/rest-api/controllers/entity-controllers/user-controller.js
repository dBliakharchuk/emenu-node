const User = require('../../../models/user');
const { PERMISSION_TYPE } = require('../../../static/data');

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

exports.createUser = async (request, response) => {
  const newUser = new User({
    name: `${request.body.firstName} ${request.body.lastName}`,
    email: request.body.email,
    password: request.body.password,
    permission_role: PERMISSION_TYPE.USER_ROLE,
  });
  await newUser
    .save()
    .then((result) => {
      response.status(200);
      response.json(result);
    })
    .catch(() => {
      response.status(400);
    });
};
