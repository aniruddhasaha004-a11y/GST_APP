import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, Plus, Minus, Trash2, Printer, MessageSquare, CreditCard, Banknote, User, ShoppingCart } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const POSBilling = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [discount, setDiscount] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/products', config);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.product === product._id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        toast.error('Not enough stock!');
        return;
      }
      setCart(cart.map(item => item.product === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      if (product.stock < 1) {
        toast.error('Out of stock!');
        return;
      }
      setCart([...cart, { 
        product: product._id, 
        name: product.name, 
        price: product.sellingPrice, 
        quantity: 1, 
        gstPercentage: product.gstPercentage 
      }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.product === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.product !== id));
  };

  // Calculations
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalGst = cart.reduce((sum, item) => sum + ((item.price * item.quantity * item.gstPercentage) / 100), 0);
  const discountAmount = Number(discount) || 0;
  const grandTotal = subTotal + totalGst - discountAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error('Cart is empty!');
    if (!customerPhone) return toast.error('Customer Phone is required!');

    const items = cart.map(item => ({
      ...item,
      total: (item.price * item.quantity) + ((item.price * item.quantity * item.gstPercentage) / 100)
    }));

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post('http://localhost:5000/api/invoices', {
        customerName: customerName || 'Walk-in',
        customerPhone,
        items,
        subTotal,
        totalGst,
        discount: discountAmount,
        grandTotal,
        paymentMode,
        status: 'Paid'
      }, config);
      
      toast.success('Invoice generated successfully!');
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setDiscount('');
      fetchProducts(); // Refresh stock
    } catch (error) {
      toast.error('Failed to generate invoice');
    }
  };

  const shareWhatsApp = () => {
    if (cart.length === 0) return;
    const text = `*Saha Spare House*\n\nTotal Bill: ₹${grandTotal.toFixed(2)}\nThank you for shopping with us!`;
    const url = `https://wa.me/${customerPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchTerm.trim()) return;

      // 1. Try exact barcode match first
      const exactMatch = products.find(p => p.barcode === searchTerm.trim());
      
      if (exactMatch) {
        addToCart(exactMatch);
        setSearchTerm('');
        return;
      }
      
      // 2. Otherwise, check if search yields exactly 1 product
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || 
        (p.barcode && p.barcode.includes(searchTerm.trim()))
      );
      
      if (filtered.length === 1) {
        addToCart(filtered[0]);
        setSearchTerm('');
      } else if (filtered.length === 0) {
        toast.error('No product matches this barcode!');
      } else {
        toast.error('Multiple products found. Please click to select.');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.barcode && p.barcode.includes(searchTerm))
  );

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* Left side: Products List */}
      <div className="flex-1 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search product or scan barcode..." 
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-lg"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product._id}
                onClick={() => addToCart(product)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-primary hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.barcode || 'No barcode'}</p>
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <div>
                    <p className="text-xl font-extrabold text-primary">₹{product.sellingPrice}</p>
                    <p className="text-xs font-medium text-gray-500">Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>{product.stock}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Cart */}
      <div className="w-[400px] xl:w-[450px] bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100 bg-slate-50">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><ShoppingCart size={20}/> Current Bill</h2>
          
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Customer Name (Optional)" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="WhatsApp Number *" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart size={48} className="mb-4 opacity-50" />
              <p>Cart is empty</p>
              <p className="text-sm">Add products to start billing</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product} className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">₹{item.price} + {item.gstPercentage}% GST</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-gray-900">₹{((item.price * item.quantity) + ((item.price * item.quantity * item.gstPercentage) / 100)).toFixed(2)}</p>
                    <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.product, -1)} className="p-1 hover:bg-white rounded text-gray-600"><Minus size={14}/></button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product, 1)} className="p-1 hover:bg-white rounded text-gray-600"><Plus size={14}/></button>
                      <button onClick={() => removeFromCart(item.product)} className="p-1 hover:bg-red-100 hover:text-red-600 rounded text-gray-400 ml-1"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-slate-50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>GST Total</span>
              <span>+ ₹{totalGst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 pb-2">
              <span>Discount</span>
              <div className="relative w-24">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input 
                  type="number" 
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-6 pr-2 py-1 text-right border border-gray-200 rounded focus:outline-none focus:border-primary text-red-500 font-medium bg-red-50"
                />
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              onClick={() => setPaymentMode('Cash')}
              className={`py-2 px-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${paymentMode === 'Cash' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-white border-2 border-gray-200 text-gray-600'}`}
            >
              <Banknote size={18} /> Cash
            </button>
            <button 
              onClick={() => setPaymentMode('UPI')}
              className={`py-2 px-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${paymentMode === 'UPI' ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' : 'bg-white border-2 border-gray-200 text-gray-600'}`}
            >
              <CreditCard size={18} /> UPI/Card
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleCheckout}
              className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-premium"
            >
              <Printer size={20} /> Checkout & Print
            </button>
            <button 
              onClick={shareWhatsApp}
              className="w-14 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-md"
            >
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSBilling;
