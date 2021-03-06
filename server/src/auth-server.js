const express = require('express');
const cors = require('cors');
const middleware = require('./middlewares/middleware');
const getMongoConnection = require('./middlewares/mongodb-connection');
const router = require('./rest-api/routers/auth-router');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(middleware.setReqHeader);

app.use(cookieParser());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN_CLIENT,
      process.env.CORS_ORIGIN_WEBPACK_CLIENT,
    ],
  })
);

getMongoConnection();

//REST API ROUTER
app.use('/', router);

// Handle unexpected url & errors
app.use(middleware.onNotPageFound);
// Handle error page
app.use(middleware.errorHandler);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on: localhost:${PORT}`);
});
