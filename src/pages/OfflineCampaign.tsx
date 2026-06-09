import { useState, useEffect } from 'react';
import { ShieldCheck, IndianRupee, MapPin, Users, Droplet, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { api, type InquiryPayload } from '../lib/api';

export default function OfflineCampaign() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    business_stage: 'early',
    city: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Offline Activation — Shri Nandi Agency';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await api.createInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business_name,
        business_stage: form.business_stage as InquiryPayload['business_stage'],
        services_interested: ['Offline Activation'],
        message: `City: ${form.city}\n${form.message}\nSource: Offline Campaign Page`,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', business_name: '', business_stage: 'early', city: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#070f1c] text-slate-100 pb-20 pt-24 md:pt-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-20">

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            Hydration with Trust
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
            Turn public goodwill into brand attention with clean, visible, local campaign execution.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            A structured 7-day local visibility campaign combining clean drinking water distribution, branded presence, printed collateral, and business lead generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-12">

            {/* The Problem / Solution */}
            <section className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white font-display mb-3">The Problem</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Local awareness is hard to build digitally when your audience is walking right past your store or office. Many informal street promotions look cheap and damage brand trust.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display mb-3">The Solution</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  We set up a visible, professional kiosk in a high-footfall area to provide free clean drinking water. This builds immediate goodwill, allowing our neat, business-like team to hand out your branded materials and capture warm leads naturally.
                </p>
              </div>
            </section>

            {/* Campaign Breakdown */}
            <section className="glass-card p-6 md:p-8 border-amber-500/20">
              <h3 className="text-xl font-bold text-white font-display mb-6">Standard 7-Day Package Structure</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Strategic Venue Selection</h4>
                    <p className="text-sm text-slate-400 mt-1">Heavy daily footfall areas, market streets, or commercial road clusters.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Professional Branded Setup</h4>
                    <p className="text-sm text-slate-400 mt-1">1 branded tent/canopy, 1 front distribution desk, 2-4 vertical banners, and 1 main brand standee.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Clean Water Distribution</h4>
                    <p className="text-sm text-slate-400 mt-1">Visibly hygienic dispensing system with sealed bottles or eco-friendly glasses.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Staffing & Lead Capture</h4>
                    <p className="text-sm text-slate-400 mt-1">Neat, trustworthy team handing out QR-enabled leaflets and capturing intent through digital forms.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-bold text-white font-display mb-2">Base Pricing & Budget Allocation</h3>
              <p className="text-sm text-slate-400 mb-6">Minimum universal starting budget for the 7-day activation.</p>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Tent/canopy and setup', value: 8000 },
                  { label: 'Branding banners and standees', value: 10000 },
                  { label: 'Water procurement & materials', value: 12000 },
                  { label: 'Staff/support operations', value: 8000 },
                  { label: 'Leaflets, cards, QR materials', value: 4000 },
                  { label: 'Logistics/Permissions contingency', value: 5000 },
                  { label: 'Reserve buffer', value: 3000 },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-400">₹{item.value.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-white/10">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Base Value</span>
                <span className="text-3xl font-bold text-white flex items-center gap-1">
                  <IndianRupee className="w-6 h-6 text-slate-400" /> 50,000
                </span>
              </div>
            </section>

          </div>

          <div className="space-y-8 sticky top-24">

            {/* Booking Form */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white font-display mb-2">Book Campaign Consultation</h3>
              <p className="text-sm text-slate-400 mb-6">Let's discuss venue targeting, scope, and timeline for your city.</p>

              {status === 'success' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle className="w-8 h-8 mx-auto" />
                  <p className="font-medium">Request Sent Successfully</p>
                  <p className="text-sm text-emerald-300/80">We will contact you shortly to plan your offline activation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 transition-colors outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="WhatsApp No."
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 transition-colors outline-none"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Target City"
                      value={form.city}
                      onChange={e => setForm({...form, city: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 transition-colors outline-none"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Business Name"
                    value={form.business_name}
                    onChange={e => setForm({...form, business_name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 transition-colors outline-none"
                  />
                  <textarea
                    required
                    placeholder="Describe your target audience and preferred local areas..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 transition-colors outline-none min-h-[100px] resize-y"
                  />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : <>Request Activation Plan <Send className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>

            {/* Payment Policy Alert */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
               <h4 className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                 <ShieldAlert className="w-4 h-4 text-amber-500" /> Commercial Policy
               </h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Every confirmed project requires a <strong className="text-slate-200">50% advance at signing</strong>. The remaining 50% is payable immediately after completion of the agreed campaign session or execution period.
               </p>
               <p className="text-[10px] text-slate-500 mt-2">
                 * Final on-ground execution is subject to local permission, weather conditions, and venue suitability. Final pricing can increase based on city, scale, print volume, staffing, and logistics.
               </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
