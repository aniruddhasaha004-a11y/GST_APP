const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
  res.send('Saha Spare House App API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/saha-spare-house';

const User = require('./models/User');

// Start server FIRST so frontend doesn't get Network Error
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB (Atlas) connected successfully');
    await seedAdmin();
  } catch (err) {
    console.warn('Atlas connection failed. Trying local database...');
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/saha-spare-house');
      console.log('MongoDB (Local) connected successfully');
      await seedAdmin();
    } catch (localErr) {
      console.error('CRITICAL: Both Atlas and Local MongoDB connections failed!');
      console.error('Atlas Error:', err.message);
      console.error('Local Error:', localErr.message);
    }
  }
};

const seedAdmin = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found. Creating default admin...');
      await User.create({
        name: 'Saha Admin',
        email: 'aniruddha123@gmail.com',
        password: 'password123',
        shopName: 'Saha Spare House',
        role: 'admin'
      });
      console.log('Default admin created! Email: aniruddha123@gmail.com, Password: password123');
    }
  } catch (error) {
    console.log('Seed error:', error.message);
  }
};

connectDB();
