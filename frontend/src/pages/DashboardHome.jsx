import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  IndianRupee, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStockAlerts: 0,
    todaysRevenue: 0,
    salesChartData: [],
    recentOrders: []
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/dashboard', config);
        setStats(data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [user.token]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="ml-3 text-lg font-medium text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Here's what's happening in your shop today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Revenue" 
          value={`₹${stats.todaysRevenue.toLocaleString('en-IN')}`} 
          icon={IndianRupee} 
          colorClass="bg-green-100 text-green-600"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={ShoppingCart} 
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={stats.lowStockAlerts} 
          icon={AlertTriangle} 
          colorClass="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Sales Overview (Last 7 Days)</h2>
          <div className="h-80">
            {stats.salesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Bar dataKey="sales" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No sales data available for the last 7 days.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h2>
          <div className="space-y-4 flex-1">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-gray-900">{order.invoiceNumber || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">
                      {order.customer ? order.customer.name : (order.customerName || 'Walk-in')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.grandTotal.toLocaleString('en-IN')}</p>
                    <p className={`text-xs font-medium ${order.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                No recent orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
