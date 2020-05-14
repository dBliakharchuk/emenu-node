const graphql = require('graphql');
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql; //grab object from graphql
const Restaurant = require('../models/restaurant');
const User = require('../models/restaurant');
const { RestaurantType } = require('./RestaurantScheme');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({ userId: parent.id });
        //return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

module.exports = UserType;
