require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('express-async-errors');

const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
//const bookRoutes = require('./routes/bookRoutes');
//const categoryRoutes = require('./routes/categoryRoutes');
//const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
//app.use('/api/books', bookRoutes);
//app.use('/api/categories', categoryRoutes);
//app.use('/api/orders', orderRoutes);

// Global error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
