const { forEachField } = require('graphql-tools');
const { getArgumentValues } = require('graphql/execution/values');
const { AuthorizationError } = require('../errors');
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

exports.attachDirectives = (schema) => {
  forEachField(schema, (field) => {
    const directives = field.astNode.directives;
    directives.forEach((directive) => {
      const directiveName = directive.name.value;
      const resolver = directiveResolvers[directiveName];

      if (resolver) {
        const oldResolve = field.resolve;
        const Directive = schema.getDirective(directiveName);
        const args = getArgumentValues(Directive, directive);

        field.resolve = function () {
          const [source, _, context, info] = arguments;
          let promise = oldResolve.call(field, ...arguments);

          const isPrimitive = !(promise instanceof Promise);
          if (isPrimitive) {
            promise = Promise.resolve(promise);
          }

          return promise.then((result) =>
            resolver(result, source, args, context, info)
          );
        };
      }
    });
  });
};
