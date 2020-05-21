const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null)
    return res
      .status(401)
      .send({ message: 'You must supply a JWT for authorization!' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token is expired or not valid: You need to sign in!');
      return res.sendStatus(403);
    }
    req.user = user;
    console.log('authenticateToken: ', user);
    next();
  });
};
