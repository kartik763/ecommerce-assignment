const productService = require('../services/product.service');
const logger = require('../config/logger');

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(
      req.body.name,
      req.body.description,
      req.body.imageUrl,
      req.body.categoryId
    );
    res.status(201).json(product);
  } catch (error) {
    logger.error(`Error creating product: ${error.message}`);
    res.status(500).json({ error: error.name == 'SequelizeUniqueConstraintError' ? 'Name Already Exists' : error.name || 'Internal Server Error' });

  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    logger.error(`Error getting products: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    logger.error(`Error getting product by ID: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await productService.getProductByName(name);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    logger.error(`Error getting product by name: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error(`Error updating product: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    logger.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    logger.error(`Error getting products by category: ${error.message}`);
    res.status(500).json({ error: error.name || 'Internal Server Error' });
  }
};