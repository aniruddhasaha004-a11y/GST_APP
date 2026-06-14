const express = require('express');
const router = express.Router();
const { createInvoice, getInvoices } = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createInvoice)
  .get(protect, getInvoices);

module.exports = router;
