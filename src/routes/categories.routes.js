const express = require('express');
const { body, param } = require('express-validator');
const {
  createCategory,
  getCategories,
  getCategoryByName,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('parentCategoryId').optional().isUUID().withMessage('Parent Category ID must be a valid UUID')
  ],
  validateRequest,
  createCategory
);

router.get('/', getCategories);

router.get(
  '/:name',
  param('name').notEmpty().withMessage('Name is required'),
  validateRequest,
  getCategoryByName
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('parentCategoryId').optional().isUUID().withMessage('Parent Category ID must be a valid UUID')
  ],
  validateRequest,
  updateCategory
);

router.delete(
  '/:id',
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  validateRequest,
  deleteCategory
);

module.exports = router;
