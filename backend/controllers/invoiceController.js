const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerId,
      items,
      subTotal,
      totalGst,
      discount,
      grandTotal,
      paymentMode,
      status
    } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No invoice items' });
    }

    // Generate Invoice Number
    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    const invoice = new Invoice({
      invoiceNumber,
      customer: customerId || null,
      customerName,
      customerPhone,
      items,
      subTotal,
      totalGst,
      discount,
      grandTotal,
      paymentMode,
      status,
      createdBy: req.user._id
    });

    const createdInvoice = await invoice.save();

    // Update Product Stock
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.product) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock = product.stock - item.quantity;
          await product.save();
        }
      }
    }

    // Update Customer Due/Total if applicable
    if (customerId) {
      const customer = await Customer.findById(customerId);
      if (customer) {
        customer.totalPurchases += grandTotal;
        if (status === 'Unpaid' || status === 'Partial') {
           // Basic logic, needs actual paid amount logic for partial
           customer.dueAmount += grandTotal;
        }
        await customer.save();
      }
    }

    res.status(201).json(createdInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 }).populate('customer', 'name phone');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices
};
