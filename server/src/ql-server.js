const express = require('express');
const cors = require('cors');
const middleware = require('./middlewares/middleware');
const getMongoConnection = require('./middlewares/mongodb-connection');
const router = require('./rest-api/routers/auth-router');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-api/main-schema');
require('dotenv').config();

const app = express();

app.use(cookieParser());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Allow to use data from another server
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN_SERVER, process.env.CORS_ORIGIN_CLIENT],
  })
);

getMongoConnection();

//REST API ROUTER
//app.use('/', router);

app.use(
  '/graphql',
  graphqlHTTP({
    schema, //schema: schema
    graphiql: true,
    cors: false,
  })
);

// Handle unexpected url & errors
//app.use(middleware.onNotPageFound);
// Handle error page
//app.use(middleware.errorHandler);

const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on: localhost:${PORT}`);
});
