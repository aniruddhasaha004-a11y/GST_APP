import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Bell, Search, User } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';

import DashboardHome from './DashboardHome';
import Inventory from './Inventory';
import POSBilling from './POSBilling';
import Customers from './Customers';
import Settings from './Settings';
import StaffManagement from './StaffManagement';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        
        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
          {/* Top Navbar */}
          <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
            {/* Search */}
            <div className="w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products, invoices (Ctrl+K)" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
              />
            </div>

            {/* Right items */}
            <div className="flex items-center gap-6">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${user?.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                  {user?.name?.charAt(0) || <User size={20}/>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.name || 'User'}</p>
                  <p className={`text-xs font-bold ${user?.role === 'admin' ? 'text-purple-600' : 'text-blue-600'}`}>
                    {user?.role?.toUpperCase() || 'STAFF'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-slate-50">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/pos" element={<POSBilling />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              
              {/* Admin Only Routes */}
              {user?.role === 'admin' ? (
                <>
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/staff" element={<StaffManagement />} />
                </>
              ) : (
                <>
                  <Route path="/settings" element={<div className="p-8 text-center text-red-500 font-bold">Access Denied: Admins Only</div>} />
                  <Route path="/staff" element={<div className="p-8 text-center text-red-500 font-bold">Access Denied: Admins Only</div>} />
                </>
              )}
              
              <Route path="*" element={<div className="p-6">Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
