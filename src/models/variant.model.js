const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const Variant = sequelize.define('Variant', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING },
  mrp: { type: DataTypes.FLOAT, allowNull: false },
  discountPrice: { type: DataTypes.FLOAT },
  size: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING },
}, { timestamps: true });

Product.hasMany(Variant, { foreignKey: 'productId' });
Variant.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Variant;

