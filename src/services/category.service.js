// const Category = require('../models/category.model');

// const createCategory = async (categoryData) => {
//   return await Category.create(categoryData);
// };

// const getCategories = async () => {
//   return await Category.findAll();
// };

// const getCategoryByName = async (name) => {
//   return await Category.findOne({ where: { name } });
// };

// const updateCategory = async (id, categoryData) => {
//   const [updated] = await Category.update(categoryData, { where: { id } });
//   if (!updated) {
//     return null;
//   }
//   return await Category.findByPk(id);
// };

// const deleteCategory = async (id) => {
//   const deleted = await Category.destroy({ where: { id } });
//   return deleted;
// };

// module.exports = {
//   createCategory,
//   getCategories,
//   getCategoryByName,
//   updateCategory,
//   deleteCategory
// };
const Category = require('../models/category.model');

exports.createCategory = async (name, parentCategoryId = null) => {
  return await Category.create({ name, parentCategoryId });
};

exports.getCategories = async () => {
  return await Category.findAll({ include: [{ model: Category, as: 'subcategories' }] });
};

exports.getCategoryByName = async (name) => {
  return await Category.findOne({ where: { name }, include: [{ model: Category, as: 'subcategories' }] });
};

exports.updateCategory = async (id, updatedData) => {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(updatedData);
  };
  
  exports.deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  };
