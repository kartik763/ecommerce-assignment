const variantService = require('../services/variant.service');
const logger = require('../config/logger');

exports.createVariant = async (req, res) => {
  try {
    const variant = await variantService.createVariant(
      req.body.name,
      req.body.mrp,
      req.body.discountPrice,
      req.body.size,
      req.body.color,
      req.body.productId,
    );
    res.status(201).json(variant);
  } catch (error) {
    logger.error(`Error creating variant: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getVariants = async (req, res) => {
  try {
    const variants = await variantService.getVariants();
    res.status(200).json(variants);
  } catch (error) {
    logger.error(`Error getting variants: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getVariantById = async (req, res) => {
  try {
    const variant = await variantService.getVariantById(req.params.id);
    if (!variant) return res.status(404).json({ error: 'Variant not found' });
    res.status(200).json(variant);
  } catch (error) {
    logger.error(`Error getting variant by ID: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const updatedVariant = await variantService.updateVariant(req.params.id, req.body);
    if (!updatedVariant) return res.status(404).json({ error: 'Variant not found' });
    res.status(200).json(updatedVariant);
  } catch (error) {
    logger.error(`Error updating variant: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const deleted = await variantService.deleteVariant(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Variant not found' });
    res.status(200).json({ message: 'Variant deleted' });
  } catch (error) {
    logger.error(`Error deleting variant: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getVariantsByProduct = async (req, res) => {
  try {
    const variants = await variantService.getVariantsByProduct(req.params.productId);
    res.status(200).json(variants);
  } catch (error) {
    logger.error(`Error getting variants by product: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};