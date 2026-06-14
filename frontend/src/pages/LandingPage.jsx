import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, ScanLine, Smartphone, Zap, CheckCircle2, XCircle, Star, Quote } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Saha<span className="text-primary">Spare</span></span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors font-medium">Testimonials</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Log In to Workspace
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 rounded-l-full blur-3xl -z-10 transform translate-x-1/2 translate-y-[-20%]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-primary/10 rounded-r-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-[20%]" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
            >
              GST Billing App For <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Spare Parts Shops</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Fast Billing, Barcode Scan, GST Invoice, Stock Management & WhatsApp Sharing. Built exclusively for modern auto part retailers.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link to="/login" className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_8px_30px_rgb(239,68,68,0.3)] hover:shadow-[0_8px_30px_rgb(239,68,68,0.5)] transform hover:-translate-y-1">
                Log In to Workspace
              </Link>
              <Link to="/login" className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                See Live Demo
              </Link>
            </motion.div>
            
            <div className="mt-10 flex justify-center items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> No credit card required</div>
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> 14-day free trial</div>
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> Setup in 2 mins</div>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" alt="Dashboard Preview" className="w-full object-cover h-[400px] md:h-[600px] opacity-90" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Manual Billing <span className="text-gray-400">vs</span> Smart Billing App</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Manual */}
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center border-b border-red-200 pb-4">MANUAL BILLING<br/><span className="text-sm font-medium text-red-500 uppercase tracking-widest mt-1 block">= Time Waste</span></h3>
              <ul className="space-y-6 mt-8">
                <li className="flex items-center gap-4 text-lg font-medium text-gray-800"><XCircle className="text-red-500 shrink-0" size={28}/> Time Lagta Hai</li>
                <li className="flex items-center gap-4 text-lg font-medium text-gray-800"><XCircle className="text-red-500 shrink-0" size={28}/> Galti Hone Ka Dar</li>
                <li className="flex items-center gap-4 text-lg font-medium text-gray-800"><XCircle className="text-red-500 shrink-0" size={28}/> Stock Ka Pata Nahi</li>
              </ul>
            </div>
            {/* Smart */}
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100 shadow-xl transform md:-translate-y-4">
              <h3 className="text-2xl font-bold text-green-600 mb-6 text-center border-b border-green-200 pb-4">SMART BILLING APP<br/><span className="text-sm font-medium text-green-500 uppercase tracking-widest mt-1 block">= Time Save</span></h3>
              <ul className="space-y-6 mt-8">
                <li className="flex items-center gap-4 text-lg font-bold text-gray-900"><CheckCircle2 className="text-green-500 shrink-0" size={28}/> Barcode Scan</li>
                <li className="flex items-center gap-4 text-lg font-bold text-gray-900"><CheckCircle2 className="text-green-500 shrink-0" size={28}/> Fast Billing</li>
                <li className="flex items-center gap-4 text-lg font-bold text-gray-900"><CheckCircle2 className="text-green-500 shrink-0" size={28}/> Stock Management</li>
                <li className="flex items-center gap-4 text-lg font-bold text-gray-900"><CheckCircle2 className="text-green-500 shrink-0" size={28}/> GST Ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Everything You Need</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Manage your entire shop in one place</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-red-100 text-primary rounded-xl flex items-center justify-center mb-6">
                <Zap size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast POS</h4>
              <p className="text-gray-600 leading-relaxed">Create GST bills in seconds. Built-in barcode scanner support makes checkout instant.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-yellow-100 text-secondary rounded-xl flex items-center justify-center mb-6">
                <BarChart3 size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Inventory</h4>
              <p className="text-gray-600 leading-relaxed">Track every spare part. Get low stock alerts before you run out of fast-moving items.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Invoices</h4>
              <p className="text-gray-600 leading-relaxed">Go paperless. Send professional PDF invoices directly to your customer's WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={36} />
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-tight">
            100+ SHOP OWNERS<br/>TRUST THIS APP
          </h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 relative shadow-2xl">
            <Quote className="absolute top-6 left-6 text-white/20 rotate-180" size={64} />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 relative z-10">
              "Is app se mera billing ka kaam bahut easy ho gaya. Ab manual bills likhne ka jhanjhat khatam, bas barcode scan karo aur customer ko WhatsApp par bill bhej do."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold text-xl">
                R
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Rahul Motors</div>
                <div className="text-white/70 text-sm">Spare Parts Dealer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 mt-4">Start for free, upgrade when you need more power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">₹999</span><span className="text-gray-500">/year</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> 500 Invoices/month</li>
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> Basic Inventory</li>
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> Thermal Printing</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">Choose Starter</button>
            </div>

            {/* Pro */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold text-white">₹2,499</span><span className="text-gray-400">/year</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-secondary" size={20}/> Unlimited Invoices</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-secondary" size={20}/> Advanced Inventory & Barcode</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-secondary" size={20}/> WhatsApp Integration</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-secondary" size={20}/> Multi-user Access</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-colors">Contact Admin</button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6"><span className="text-4xl font-extrabold">₹4,999</span><span className="text-gray-500">/year</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> Multiple Branches</li>
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> Custom API Access</li>
                <li className="flex items-center gap-3 text-gray-600"><CheckCircle2 className="text-green-500" size={20}/> Priority Support</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-300 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">Saha<span className="text-primary">Spare</span></span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Saha Spare House. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
