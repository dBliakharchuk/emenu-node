const Menu = require('../../models/menu');

exports.getMenuById = (menuId) => {
  return Menu.findById(menuId);
};

exports.getAllMenus = () => {
  return Menu.find({});
};

exports.getMenusFromRestaurant = (restaurantId) => {
  return Menu.find({ restaurantId: restaurantId });
  //return _.filter(restaurants, { restaurantId: restaurantId });
};

exports.saveMenu = (menu) => {
  let newMenu = new Menu({
    name: menu.name,
    description: menu.description,
    restaurantId: menu.restaurantId,
  });
  return newMenu.save();
};
