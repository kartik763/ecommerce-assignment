const express = require('express');
const { body, param } = require('express-validator');
const {
  createVariant,
  getVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
  getVariantsByProduct
} = require('../controllers/variant.controller');
const { validateRequest } = require('../middlewares/validateRequest');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('mrp').isFloat({ min: 0 }).withMessage('MRP must be a positive number'),
    body('discountPrice').optional().isFloat({ min: 0 }).withMessage('Discount Price must be a positive number'),
    body('size').optional().notEmpty().withMessage('Size cannot be empty'),
    body('color').optional().notEmpty().withMessage('Color cannot be empty'),
    body('productId').isUUID().withMessage('Product ID must be a valid UUID')
  ],
  validateRequest,
  createVariant
);

router.get('/', getVariants);

router.get(
  '/:id',
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  validateRequest,
  getVariantById
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('mrp').optional().isFloat({ min: 0 }).withMessage('MRP must be a positive number'),
    body('discountPrice').optional().isFloat({ min: 0 }).withMessage('Discount Price must be a positive number'),
    body('size').optional().notEmpty().withMessage('Size cannot be empty'),
    body('color').optional().notEmpty().withMessage('Color cannot be empty'),
    body('productId').optional().isUUID().withMessage('Product ID must be a valid UUID')
  ],
  validateRequest,
  updateVariant
);

router.delete(
  '/:id',
  param('id').isUUID().withMessage('ID must be a valid UUID'),
  validateRequest,
  deleteVariant
);

router.get(
  '/product/:productId',
  param('productId').isUUID().withMessage('Product ID must be a valid UUID'),
  validateRequest,
  getVariantsByProduct
);

module.exports = router;