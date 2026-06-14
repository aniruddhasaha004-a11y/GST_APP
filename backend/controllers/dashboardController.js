const Product = require('../models/Product');
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Products
    const totalProducts = await Product.countDocuments();

    // 2. Total Orders
    const totalOrders = await Invoice.countDocuments();

    // 3. Low Stock Alerts (Products with stock <= 5)
    const lowStockAlerts = await Product.countDocuments({ stock: { $lte: 5 } });

    // 4. Today's Revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const todayInvoices = await Invoice.find({
      createdAt: { $gte: today }
    });

    const todaysRevenue = todayInvoices.reduce((acc, invoice) => acc + invoice.grandTotal, 0);

    // 5. Recent Orders (Last 5)
    const recentOrders = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customer', 'name');

    // 6. Sales Data for the last 7 days (for the chart)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyInvoices = await Invoice.find({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Initialize array with last 7 days
    const salesDataMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      salesDataMap[dayName] = 0;
    }

    // Populate chart data
    weeklyInvoices.forEach(invoice => {
      const dayName = new Date(invoice.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
      if (salesDataMap[dayName] !== undefined) {
        salesDataMap[dayName] += invoice.grandTotal;
      }
    });

    const salesChartData = Object.keys(salesDataMap).map(key => ({
      name: key,
      sales: salesDataMap[key]
    }));

    // Send response
    res.json({
      totalProducts,
      totalOrders,
      lowStockAlerts,
      todaysRevenue,
      salesChartData,
      recentOrders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
