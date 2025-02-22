const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { timestamps: true });

Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentCategoryId' });

module.exports = Category;
