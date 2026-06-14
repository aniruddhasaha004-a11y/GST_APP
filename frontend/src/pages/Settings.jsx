import { useState } from 'react';
import { Store, Receipt, Printer, Save, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [shopName, setShopName] = useState('Saha Spare House');
  const [gstNumber, setGstNumber] = useState('29ABCDE1234F2Z5');
  const [address, setAddress] = useState('123 Auto Market, Main Road, Delhi');
  const [phone, setPhone] = useState('+91 9876543210');
  const [invoicePrefix, setInvoicePrefix] = useState('INV-2026-');
  const [printerType, setPrinterType] = useState('Thermal');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Manage your shop details, billing preferences, and printing</p>
      </div>

      <div className="space-y-8">
        {/* General Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
            <Store size={20} className="text-gray-500" />
            <h2 className="font-bold text-gray-900">General Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
              <input 
                type="text" 
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Shop Address</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Billing & Tax */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
            <Receipt size={20} className="text-gray-500" />
            <h2 className="font-bold text-gray-900">Billing & Tax Configuration</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Identification Number (GSTIN)</label>
              <input 
                type="text" 
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:outline-none uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
              <input 
                type="text" 
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Printing */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
            <Printer size={20} className="text-gray-500" />
            <h2 className="font-bold text-gray-900">Printing Preferences</h2>
          </div>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">Default Invoice Format</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${printerType === 'Thermal' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" 
                  name="printer" 
                  value="Thermal" 
                  checked={printerType === 'Thermal'} 
                  onChange={() => setPrinterType('Thermal')}
                  className="sr-only"
                />
                <Printer className={printerType === 'Thermal' ? 'text-primary' : 'text-gray-400'} size={24}/>
                <div>
                  <p className={`font-bold ${printerType === 'Thermal' ? 'text-primary' : 'text-gray-700'}`}>Thermal Printer</p>
                  <p className="text-xs text-gray-500">2-inch or 3-inch roll</p>
                </div>
              </label>

              <label className={`flex-1 flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${printerType === 'A4' ? 'border-primary bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" 
                  name="printer" 
                  value="A4" 
                  checked={printerType === 'A4'} 
                  onChange={() => setPrinterType('A4')}
                  className="sr-only"
                />
                <Receipt className={printerType === 'A4' ? 'text-primary' : 'text-gray-400'} size={24}/>
                <div>
                  <p className={`font-bold ${printerType === 'A4' ? 'text-primary' : 'text-gray-700'}`}>A4 Size Printer</p>
                  <p className="text-xs text-gray-500">Standard laser printer</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-premium hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <Save size={20} /> Save Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
