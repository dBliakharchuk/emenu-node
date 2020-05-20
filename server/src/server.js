const ApolloServer = 'apollo-server-express';
const express = require('express');
const cors = require('cors');
const middleware = require('./middlewares/middleware');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemes/main-schema');
const getMongoConnection = require('./middlewares/mongodb-connection');
const router = require('./routers/api-router');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(cookieParser());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(cors({ origin: process.env.CORS_ORIGIN_AUTH_SERVER }));

//Connect to Mongo DataBase on https://cloud.mongodb.com/
getMongoConnection();
// const server = new ApolloServer({
//   schema,
// });

// server.applyMiddleware({ app });

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on: localhost:${PORT}`);
});
