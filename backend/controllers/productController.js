const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, barcode, category, brand, stock, minStockAlert, purchasePrice, sellingPrice, gstPercentage } = req.body;
    
    // Check if product with barcode exists
    if (barcode) {
      const existingProduct = await Product.findOne({ barcode });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with this barcode already exists' });
      }
    }

    const product = new Product({
      name,
      barcode,
      category,
      brand,
      stock,
      minStockAlert,
      purchasePrice,
      sellingPrice,
      gstPercentage
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.barcode = req.body.barcode || product.barcode;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
      product.minStockAlert = req.body.minStockAlert || product.minStockAlert;
      product.purchasePrice = req.body.purchasePrice || product.purchasePrice;
      product.sellingPrice = req.body.sellingPrice || product.sellingPrice;
      product.gstPercentage = req.body.gstPercentage || product.gstPercentage;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
