const { PERMISSION_TYPE } = require('../../../static/data');
const jwtController = require('./jwt-controller');
const User = require('../../../models/user');

exports.isUserSignedIn = (req, res, next) => {
  if (req.user == null) {
    res.status(403);
    return res.send('You should to sign in first');
  } else {
  }
};

exports.authUser = (req, res, next) => {
  if (req.user == null) {
    req.status(403);
    return res.send('You need to sign in!');
  }
  next();
};

exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.permission_role !== role) {
      res.status(401);
      return res.send('Not allowed!');
    }
    next();
  };
};

exports.loginUser = async (req, res) => {
  // Authenticate User

  console.log(PERMISSION_TYPE.ADMIN_ROLE);
  const email = req.body.email;
  const password = req.body.password;

  let foundUser = null;
  await getUserByEmail(email, (user) => (foundUser = user));

  console.log(foundUser);
  const user = {
    email: foundUser.email,
    password: foundUser.password,
    _id: foundUser._id,
    permission_role: foundUser.permission_role,
  };

  console.log('Data from POST req', user);
  // Add JWT to header of request
  const accessToken = jwtController.generateaccessToken(user);
  const refreshToken = jwtController.generaterefreshToken(user);

  // Save refresh token to storage of tokens
  jwtController.pushRefreshTokenToStorage(refreshToken);

  // Save refreshToken into cookies
  // ?Probably isnt good idia to it?
  res.cookie('token', refreshToken, { httpOnly: true });
  // Save accessToken to cookies
  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('accessToken');
  jwtController.removeRefreshTokenToStorage(req.body.token);
  res.sendStatus(204);
};

async function getUserByEmail(userEmail, callback) {
  await User.findOne({ email: userEmail }, (err, user) => {
    if (err) {
      console.log(`User with ${userEmail} not found!`);
      return null;
    }
    callback(user);
  });
}
