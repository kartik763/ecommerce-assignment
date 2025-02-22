const express = require('express');
const { body, param } = require('express-validator');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductById,
  getProductsByCategory
} = require('../controllers/product.controller');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('imageUrl').isURL().withMessage('Image URL must be valid'),
    body('categoryId').isUUID().withMessage('Category ID must be a valid UUID')
  ],
  validateRequest,
  createProduct
);

router.get('/', getProducts);

router.get(
  '/:id',
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  validateRequest,
  getProductById
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
    body('categoryId').optional().isUUID().withMessage('Category ID must be a valid UUID')
  ],
  validateRequest,
  updateProduct
);

router.delete(
  '/:id',
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  validateRequest,
  deleteProduct
);

router.get(
  '/product-name/:name',
  param('name').notEmpty().withMessage('Name is required'),
  validateRequest,
  getProductByName
);

router.get(
  '/category/:id',
  param('id').isUUID().withMessage('Category ID must be a valid UUID'),
  validateRequest,
  getProductsByCategory
);

module.exports = router;
