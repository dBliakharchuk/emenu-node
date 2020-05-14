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

const User = require('../models/user');
const { UserType } = require('./UserScheme');

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    host: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent);
        return User.findById(parent.userId);
        //return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

module.exports = RestaurantType;
