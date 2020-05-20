const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./middlewares/middleware');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemes/main-schema');
const getMongoConnection = require('./middlewares/mongodb-connection');
const router = require('./routers/auth-router');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(cookieParser());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(cors({ origin: process.env.CORS_ORIGIN_SERVER }));

getMongoConnection();

//REST API ROUTER
app.use('/', router);

app.use(
  '/graphql',
  graphqlHTTP({
    schema, //schema: schema
    graphiql: true,
  })
);

// Handle unexpected url & errors
app.use(middleware.onNotPageFound);
// Handle error page
app.use(middleware.errorHandler);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on: localhost:${PORT}`);
});
