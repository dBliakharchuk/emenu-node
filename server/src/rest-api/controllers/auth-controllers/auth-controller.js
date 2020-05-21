const { PERMISSION_TYPE } = require('../../../static/data');
const jwtController = require('./jwt-controller');
const User = require('../../../models/user');

exports.isUserSignedIn = (req, res, next) => {
  if (req.user == null) {
    res.status(403);
    return res.send('You should to sign in first');
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
  const email = req.body.email;
  const password = req.body.password;

  let foundUser = null;
  await getUserByEmail(email, (user) => (foundUser = user));

  if (!foundUser) {
    res.status(403);
    return res.send('You need to sign in!');
  }

  if (foundUser.password !== password) {
    res.status(401);
    return res.send('Credentials arent valid!');
  }
  console.log(foundUser);

  const logedInUser = {
    email: foundUser.email,
    password: foundUser.password,
    _id: foundUser._id,
    permission_role: foundUser.permission_role,
  };

  // Add JWT to header of request
  const accessToken = jwtController.generateaccessToken(logedInUser);
  const refreshToken = jwtController.generaterefreshToken(logedInUser);

  // Save refresh token to storage of tokens
  jwtController.pushRefreshTokenToStorage(refreshToken);

  // Save refreshToken && accessToken into cookies
  res.cookie('token', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
  });

  console.log('Show cookies: ');
  console.log(req.cookies);
  res.send({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('accessToken');
  res.clearCookie('access-token');
  console.log(req.cookies);
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
