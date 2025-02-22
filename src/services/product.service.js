const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Variant = require('../models/Variant.model');

exports.createProduct = async (name, description, imageUrl, categoryId) => {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) throw new Error('Category not found');

    return await Product.create({ name, description, imageUrl, categoryId: category.id });
};

exports.getProducts = async () => {
    return await Product.findAll({ include: [{ model: Category, attributes: ['name'] }] });
};

exports.getProductByName = async (name) => {
    return await Product.findOne({ where: { name }, include: [{ model: Category, attributes: ['name'] }, { model: Variant }] });
};
exports.getProductById = async (id) => {
    return await Product.findByPk(id);
};

exports.updateProduct = async (id, updatedData) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(updatedData);
};

exports.deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return false;
    await product.destroy();
    return true;
};

exports.getProductsByCategory = async (categoryId) => {
    return await Product.findAll({ where: { categoryId }, include: [{ model: Variant, attributes: ['name'] }] });
};
