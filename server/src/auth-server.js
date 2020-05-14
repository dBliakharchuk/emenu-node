const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./middleware');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemes/main-schema');
const getMongoConnection = require('./mongodb-connection');
const router = require('./auth-router');

require('dotenv').config();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(cors({ origin: process.env.CORS_ORIGIN }));

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
