const ApolloServer = 'apollo-server-express';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./middleware');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemes/main-schema');
const User = require('./models/user');
const getMongoConnection = require('./mongodb-connection');

require('dotenv').config();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(cors({ origin: process.env.CORS_ORIGIN }));

//Connect to Mongo DataBase on https://cloud.mongodb.com/
getMongoConnection();
// const server = new ApolloServer({
//   schema,
// });

// server.applyMiddleware({ app });

//REST API
app.use('/users', (req, res) => {
  let users = User.find({}, (err, users) => {
    if (err) {
      console.log('Error while fetching users');
    }
    res.json(users);
  });
});

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
