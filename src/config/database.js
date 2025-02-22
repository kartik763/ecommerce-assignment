const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME || "ecommerce", process.env.DB_USER || "postgres", process.env.DB_PASS || "123", {
  host: process.env.DB_HOST || "localhost",
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
})();

module.exports = sequelize;
