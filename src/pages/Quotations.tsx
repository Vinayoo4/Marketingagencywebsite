import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, CheckCircle, ChevronDown, Send, ShieldAlert, Plus } from 'lucide-react';
import { api, type ServicePackage, type PackageAddon, type Faq, type InquiryPayload } from '../lib/api';

export default function Quotations() {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [addons, setAddons] = useState<PackageAddon[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    business_stage: 'early',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Universal Quotations — Shri Nandi Agency';
    Promise.all([
      api.getServicePackages(),
      api.getPackageAddons(),
      api.getFaqs(),
    ]).then(([pkgData, addonData, faqData]) => {
      setPackages(pkgData);
      setAddons(addonData);
      setFaqs(faqData);
      if (pkgData.length > 0) setSelectedPackage(pkgData[0].id);
    }).finally(() => setLoading(false));
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const currentPackage = packages.find(p => p.id === selectedPackage);
  const totalAddonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon ? parseInt(addon.price, 10) : 0);
  }, 0);

  const basePrice = currentPackage ? parseInt(currentPackage.price, 10) : 0;
  const totalPrice = basePrice + totalAddonsPrice;
  const advanceAmount = totalPrice * 0.5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const packageDetails = currentPackage ? `\nSelected Package: ${currentPackage.name}` : '';
      const addonDetails = selectedAddons.length > 0 ? `\nAdd-ons: ${selectedAddons.map(id => addons.find(a => a.id === id)?.name).join(', ')}` : '';
      const priceDetails = `\nTotal Estimated Price: ₹${totalPrice.toLocaleString('en-IN')} (Advance: ₹${advanceAmount.toLocaleString('en-IN')})`;

      await api.createInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business_name,
        business_stage: form.business_stage as InquiryPayload['business_stage'],
        services_interested: ['Quotation Request'],
        message: `${form.message}\n${packageDetails}${addonDetails}${priceDetails}\nSource: Quotation Generator`,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', business_name: '', business_stage: 'early', message: '' });
      setSelectedAddons([]);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#070f1c] text-slate-100 pb-20 pt-24 md:pt-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-16">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display">Clear quotations for businesses that want marketing and growth support without confusion.</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Standardized packages, universal logic, and no hidden terms. Build your custom proposal and know exactly what to expect.
          </p>
        </div>

        {loading ? (
           <div className="text-center py-20">
             <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
             <p className="text-slate-400 text-sm">Loading quotation engine...</p>
           </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Left Col: Configurator */}
            <div className="lg:col-span-7 space-y-8">

              {/* Package Selection */}
              <div className="glass-card p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-bold text-white font-display">Select Base Package</h2>
                </div>

                <div className="space-y-4">
                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                          : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {selectedPackage === pkg.id && (
                        <div className="absolute top-4 right-4 text-cyan-400">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white mb-1 pr-8">{pkg.name}</h3>
                      <p className="text-xs text-cyan-400 mb-3 font-medium tracking-wide">BEST FOR: {pkg.targetAudience.toUpperCase()}</p>
                      <p className="text-sm text-slate-400 mb-4">{pkg.description}</p>

                      <div className="flex items-center gap-1.5 text-slate-200 font-semibold bg-slate-900/50 inline-flex px-3 py-1.5 rounded-lg border border-slate-700">
                        <IndianRupee className="w-4 h-4 text-slate-400" />
                        {parseInt(pkg.price, 10).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="glass-card p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-bold text-white font-display">Optional Add-ons</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {addons.map(addon => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`relative p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                        selectedAddons.includes(addon.id)
                          ? 'bg-violet-500/10 border-violet-500/50'
                          : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white text-sm pr-6">{addon.name}</h4>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          selectedAddons.includes(addon.id) ? 'bg-violet-500 border-violet-500 text-white' : 'border-slate-600'
                        }`}>
                          {selectedAddons.includes(addon.id) && <CheckCircle className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{addon.description}</p>
                      <div className="text-sm font-medium text-slate-300 flex items-center gap-1">
                        +<IndianRupee className="w-3 h-3" />{parseInt(addon.price, 10).toLocaleString('en-IN')} <span className="text-xs text-slate-500 font-normal">({addon.unit})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Rules */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldAlert className="w-24 h-24 text-amber-500" />
                </div>
                <div className="relative z-10">
                  <h3 className="flex items-center gap-2 text-amber-400 font-semibold mb-3">
                    <ShieldAlert className="w-5 h-5" /> Mandatory Payment Policy
                  </h3>
                  <p className="text-sm text-amber-200/80 leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
                    "Every confirmed project requires a 50% advance at signing. The remaining 50% is payable immediately after completion of the agreed campaign session or execution period. Execution timelines begin only after receipt of the initial advance."
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Summary & Lead Form */}
            <div className="lg:col-span-5 space-y-6">

              {/* Live Summary */}
              <div className="glass-card p-6 md:p-8 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Quotation Summary</h3>

                {currentPackage ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300 font-medium">{currentPackage.name}</span>
                        <span className="text-white font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-3">Base Package</div>

                      {selectedAddons.length > 0 && (
                        <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                          {selectedAddons.map(id => {
                            const addon = addons.find(a => a.id === id);
                            if(!addon) return null;
                            return (
                              <div key={id} className="flex justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-1.5"><Plus className="w-3 h-3"/> {addon.name}</span>
                                <span className="text-slate-300">₹{parseInt(addon.price, 10).toLocaleString('en-IN')}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Total Value</span>
                        <span className="text-2xl font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cyan-400 font-medium">Advance required (50%)</span>
                          <span className="text-cyan-400 font-bold">₹{advanceAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Balance on completion</span>
                          <span>₹{advanceAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 text-center pt-2">Quotation validity: 7 days from issue date. Taxes extra as applicable.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic text-center py-10">Select a package to view summary.</p>
                )}

                {/* Form attached to summary */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-4">Request Official Quotation</h4>

                  {status === 'success' ? (
                     <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-xl text-center space-y-3">
                       <CheckCircle className="w-8 h-8 mx-auto" />
                       <p className="font-medium">Request Sent Successfully</p>
                       <p className="text-sm text-emerald-300/80">We will review your requirements and send the official quotation shortly.</p>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-500 transition-colors outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="WhatsApp No."
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-500 transition-colors outline-none"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-500 transition-colors outline-none"
                        />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Business/Company Name"
                        value={form.business_name}
                        onChange={e => setForm({...form, business_name: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-500 transition-colors outline-none"
                      />
                      <textarea
                        required
                        placeholder="Briefly describe your goals or specific needs..."
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-500 transition-colors outline-none min-h-[80px] resize-y"
                      />

                      <button
                        type="submit"
                        disabled={status === 'loading' || !currentPackage}
                        className="btn w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? 'Submitting...' : <>Submit Request <Send className="w-4 h-4" /></>}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* FAQs */}
        {!loading && faqs.length > 0 && (
          <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-8 font-display">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="glass-card overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-semibold text-slate-200 text-sm md:text-base pr-8">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4 text-sm text-slate-400 leading-relaxed"
                      >
                        <div className="pt-2 border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
