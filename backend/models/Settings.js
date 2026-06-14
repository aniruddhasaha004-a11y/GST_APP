const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  gstNumber: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  logoUrl: { type: String },
  invoicePrefix: { type: String, default: 'INV-' },
  printerType: { type: String, enum: ['Thermal', 'A4'], default: 'Thermal' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
