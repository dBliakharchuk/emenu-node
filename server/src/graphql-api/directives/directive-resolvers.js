const { forEachField } = require('graphql-tools');
const { getArgumentValues } = require('graphql/execution/values');
const { AuthorizationError } = require('./../errors');
const jwt = require('jsonwebtoken');

exports.directiveResolvers = {
  isAuthenticated(result, source, args, context) {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization',
      });
    }

    try {
      const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return result; // return already calculated 'result' if user authed
    } catch (err) {
      throw new AuthorizationError({
        message: 'You are not authorized! Access Token expired.',
      });
    }
  },
  hasScoped(result, source, args, context) {
    const token = req.cookies.accessToken;
    const exprectedScope = args.scope;
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization',
      });
    }
    try {
      const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const scope = decodedUser.permission_role;
      if (scope == exprectedScope) {
        return result;
      }
    } catch (err) {
      return Promise.reject(
        new AuthorizationError({
          message: `You are not authorized. Expected scopes: ${expectedScope}`,
        })
      );
    }
  },
};
