import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingCart, label: 'POS Billing', path: '/dashboard/pos' },
    { icon: Package, label: 'Inventory', path: '/dashboard/inventory' },
    { icon: Users, label: 'Customers', path: '/dashboard/customers' },
  ];

  // Only admins can see Staff and Settings
  const adminItems = [
    { icon: Users, label: 'Staff / Users', path: '/dashboard/staff' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavItems = (items) => (
    items.map((item) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.path;
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
            isActive 
              ? 'bg-red-500 text-white shadow-md' 
              : 'text-gray-300 hover:bg-[#1f2937] hover:text-white'
          }`}
        >
          <Icon size={20} />
          {item.label}
        </Link>
      );
    })
  );

  return (
    <aside className="w-64 bg-[#111827] text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20">
      <div className="p-6 flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-premium">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight leading-none block">Saha<span className="text-primary">Spare</span></span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Workspace</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {renderNavItems(menuItems)}
          
          {user?.role === 'admin' && (
            <>
              <div className="pt-6 pb-2">
                <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Admin</p>
              </div>
              {renderNavItems(adminItems)}
            </>
          )}
        </nav>
      </div>

      <div className="p-6 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
