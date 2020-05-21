const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');

exports.checkAuthAndResolve = (contex, controller) => {
  const token = contex.cookies.accessToken;
  console.log('Cookies', contex.cookies);
  if (!token) {
    throw new AuthorizationError({
      message: 'You must supply a JWT for authorization',
    });
  }

  const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return controller.apply(this, [decodedUser]);
};

exports.checkScopeAndResolve = (
  context,
  expectedScope,
  controller,
  ...params
) => {
  const token = context.cookies.accessToken;
  console.log(token);
  if (!token) {
    throw new AuthorizationError({
      message: 'You must supply a JWT for authorization',
    });
  }

  const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const scope = decodedUser.permission_role;

  console.log(decodedUser);
  console.log(expectedScope);
  if (!scope) {
    throw new AuthorizationError({ message: 'No scopes supplied!' });
  }
  if (expectedScope !== scope) {
    throw new AuthorizationError({
      message: `You are not authorized. Expected scopes: ${expectedScopes}`,
    });
  }
  return controller.apply(this, params);
};
