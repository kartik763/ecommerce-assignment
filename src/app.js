const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimiter = require('./middlewares/rateLimiter');
const categoryRoutes = require('./routes/categories.routes');
const productRoutes = require('./routes/products.routes');
const variantRoutes = require('./routes/variants.routes');
const expressStatusMonitor = require('express-status-monitor');
const errorHandler = require('./middlewares/errorHandler.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(morgan('combined'));
app.use(expressStatusMonitor());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);


// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variants', variantRoutes);

module.exports = app;
