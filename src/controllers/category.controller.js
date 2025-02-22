const categoryService = require('../services/category.service');
const logger = require('../config/logger');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body.name, req.body.parentCategoryId);
    res.status(201).json(category);
  } catch (error) {
    logger.error(`Error creating category: ${error.message}`);
    res.status(500).json({ error: error.name == 'SequelizeUniqueConstraintError' ? 'Name Already Exists' : error.name || 'Internal Server Error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    logger.error(`Error getting categories: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

const getCategoryByName = async (req, res) => {
  try {
    const category = await categoryService.getCategoryByName(req.params.name);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    logger.error(`Error getting category by name: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    logger.error(`Error updating category: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting category: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryByName,
  updateCategory,
  deleteCategory
};