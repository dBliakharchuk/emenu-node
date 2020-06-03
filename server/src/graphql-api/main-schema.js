const graphql = require('graphql');
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
const dishController = require('./controllers/dish-controller');
const categoryController = require('./controllers/category-controller');
const menuController = require('./controllers/menu-controller');
const userController = require('./controllers/user-controller');
const restaurantController = require('./controllers/restaurant-controller');
const authController = require('./controllers/auth-controller');

const { PERMISSION_TYPE } = require('../static/data');

const {
  checkAuthAndResolve,
  checkScopeAndResolve,
  checkAuthFromReqAndResolve,
} = require('./resolvers/auth-resolvers');

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
        return userController.getUserById(parent.userId);
      },
    },
    menus: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return menuController.getMenusFromRestaurant(parent.id);
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
    permission_role: { type: GraphQLString },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return restaurantController.getRestaurantByUserId(parent.id);
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
        return restaurantController.getRestaurantById(parent.restaurantId);
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return categoryController.getCategoriesByMenuId(parent.id);
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
        return menuController.getMenuById(parent.menuId);
      },
    },
    dishes: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return dishController.getDishesByCategoryId(parent.id);
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
        return dishController.getDishById(parent.categoryId);
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

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    logoutUser: {
      type: UserType,
      resolve: (parent, _, context) => {
        return authController.logoutUser(context);
      },
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return restaurantController.getRestaurantById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userController.getUserById(args.id);
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args, context) {
        return checkScopeAndResolve(
          context,
          PERMISSION_TYPE.USER_ROLE,
          restaurantController.getAllRestaurants
        );
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, context) {
        return checkAuthAndResolve(context, userController.getAllUsers);
      },
    },
    menus: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return menuController.getAllMenus();
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return categoryController.getAllCategories();
      },
    },
    dishes: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return dishController.getAllDishes();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    getAccount: {
      type: UserType,
      args: {
        accessToken: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args, context) => {
        return checkAuthFromReqAndResolve(
          context,
          args.accessToken,
          userController.getUserByToken
        );
      },
    },
    loginUser: {
      type: TokenType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
      },
      resolve: (parent, args, context) => {
        return authController.loginUser(args, context);
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return userController.saveUser(args, PERMISSION_TYPE.USER_ROLE);
      },
    },
    addAdmin: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return userController.saveUser(args, PERMISSION_TYPE.ADMIN_ROLE);
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
        return restaurantController.saveRestaurant(args);
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
        return menuController.saveMenu(args);
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
        return categoryController.saveCategory(args);
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
        return dishController.saveDish(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
