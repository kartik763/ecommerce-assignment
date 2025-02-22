const Variant = require('../models/Variant.model');
const Product = require('../models/product.model');

exports.createVariant = async (name, mrp, discountPrice, size, color, productId) => {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) throw new Error('Product not found');

    return await Variant.create({ name, mrp, discountPrice, size, color, productId: product.id });
};

exports.getVariants = async () => {
    return await Variant.findAll({ include: [{ model: Product, attributes: ['name'] }] });
};

exports.getVariantsByProduct = async (productId) => {
    return await Variant.findAll({ where: { productId } });
};

exports.updateVariant = async (variantId, updatedData) => {
    const variant = await Variant.findByPk(variantId);
    if (!variant) return null;
    return await variant.update(updatedData);
};

exports.deleteVariant = async (variantId) => {
    const variant = await Variant.findByPk(variantId);
    if (!variant) return false;
    await variant.destroy();
    return true;
};

exports.getVariantById = async (id) => {
      return await Variant.findByPk(id);
    };
