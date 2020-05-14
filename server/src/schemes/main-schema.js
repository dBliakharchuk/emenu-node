const graphql = require('graphql');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const Category = require('../models/category');
const Dish = require('../models/dish');
const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;
// const UserType = require('./UserScheme');
// const RestaurantType = require('./RestaurantScheme');

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    host: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent);
        return User.findById(parent.userId);
        //return _.find(authors, { id: parent.authorId });
      },
    },
    menus: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({ restaurantId: parent.id });
        //return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

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

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        return Restaurant.findById(parent.restaurantId);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({ menuId: parent.id });
        //return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    menu: {
      type: MenuType,
      resolve(parent, args) {
        return Category.findById(parent.menuId);
      },
    },
    dishes: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return Dish.find({ categoryId: parent.id });
        //return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const DishType = new GraphQLObjectType({
  name: 'Dish',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    image: { type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Dish.findById(parent.categoryId);
      },
    },
    // ingredients: {
    //     type: new GraphQLList(CategoryType),
    //     resolve(parent, args) {
    //     return Category.find({ menuId: parent.id });
    //     //return _.filter(books, { authorId: parent.id });
    //   },
    // }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    restaurant: {
      //we gonna use it in query
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return Restaurant.findById(args.id);
        //return _.find(books, { id: args.id });
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
        //return _.find(authors, { id: args.id });
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({});
        //return books;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
        //return authors;
      },
    },
    menus: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({});
        //return books;
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
        //return books;
      },
    },
    dishes: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return Dish.find({});
        //return books;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let restaurant = new Restaurant({
          name: args.name,
          address: args.address,
          userId: args.userId,
        });
        return restaurant.save();
      },
    },
    addMenu: {
      type: MenuType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let menu = new Menu({
          name: args.name,
          description: args.description,
          restaurantId: args.restaurantId,
        });
        return menu.save();
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        menuId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let category = new Category({
          name: args.name,
          description: args.description,
          menuId: args.menuId,
        });
        return category.save();
      },
    },
    addDish: {
      type: DishType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        image: { type: GraphQLString },
        categoryId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let dish = new Dish({
          name: args.name,
          description: args.description,
          price: args.price,
          image: args.image,
          categoryId: args.categoryId,
        });
        return dish.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
