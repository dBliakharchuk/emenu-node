const Category = require('../../models/category');

exports.getCategoryById = (categoryId) => {
  return Category.findById(categoryId);
};

exports.getAllCategories = () => {
  return Category.find({});
};

exports.getCategoriesByMenuId = (menuId) => {
  return Category.find({ menuId: menuId });
  //return _.filter(books, { authorId: parent.id });
};

exports.saveCategory = (category) => {
  let newCategory = new Category({
    name: category.name,
    description: category.description,
    menuId: category.menuId,
  });
  return newCategory.save();
};
