const { getUserByEmail } = require('./user-controller');
const {
  generateaccessToken,
  generaterefreshToken,
  pushRefreshTokenToStorage,
  removeRefreshTokenToStorage: removeRefreshTokenFromStorage,
} = require('./jwt-controller');

const { AuthorizationError } = require('../errors');

exports.loginUser = async (userToLogin, context) => {
  const email = userToLogin.email;
  const password = userToLogin.password;

  let foundUser = null;
  await getUserByEmail(email, (user) => (foundUser = user));

  if (!foundUser) {
    throw new AuthorizationError({
      message: 'Provided User doesnt exists',
    });
  }

  if (foundUser.password !== password) {
    throw new AuthorizationError({
      message: 'Password isnt valid',
    });
  }
  console.log(foundUser);

  const logedInUser = {
    email: foundUser.email,
    password: foundUser.password,
    _id: foundUser._id,
    permission_role: foundUser.permission_role,
  };

  // Add JWT to header of request
  const accessToken = generateaccessToken(logedInUser);
  const refreshToken = generaterefreshToken(logedInUser);

  // Save refresh token to storage of tokens
  pushRefreshTokenToStorage(refreshToken);

  // Save refreshToken && accessToken into cookies
  context.res.cookie('token', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
  });
  context.res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
  });

  console.log('Show context.response: ');
  console.log(context.cookies);

  return foundUser;
};

exports.logoutUser = (context) => {
  context.res.clearCookie('token');
  context.res.clearCookie('accessToken');
  removeRefreshTokenFromStorage(context.body.token);
  //context.res.sendStatus(204);
};
