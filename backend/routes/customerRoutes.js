const express = require('express');
const router = express.Router();
const { getCustomers, createCustomer } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCustomers)
  .post(protect, createCustomer);

module.exports = router;
