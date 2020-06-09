// Handle unexpected url & errors
const onNotPageFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Handle error page
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    // messsage: error.messsage,
    stack:
      process.env.NODE_ENV === 'production' ? 'Not this time' : error.stack,
  });
};

// Set request header
const setReqHeader = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

module.exports = {
  onNotPageFound,
  errorHandler,
  setReqHeader,
};
