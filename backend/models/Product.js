const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, unique: true },
  category: { type: String },
  brand: { type: String },
  stock: { type: Number, default: 0 },
  minStockAlert: { type: Number, default: 5 },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  gstPercentage: { type: Number, default: 18 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
