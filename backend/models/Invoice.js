const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Selling price per unit
  gstPercentage: { type: Number, required: true },
  total: { type: Number, required: true } // Price * Quantity + GST
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String }, // For walk-in customers without an account
  customerPhone: { type: String },
  items: [invoiceItemSchema],
  subTotal: { type: Number, required: true },
  totalGst: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMode: { type: String, enum: ['Cash', 'Card', 'UPI', 'Due'], default: 'Cash' },
  status: { type: String, enum: ['Paid', 'Partial', 'Unpaid'], default: 'Paid' },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
