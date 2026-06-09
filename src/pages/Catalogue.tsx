import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, IndianRupee, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, type ServicePackage, type Service } from '../lib/api';

export default function Catalogue() {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Service Catalogue — Shri Nandi Agency';
    Promise.all([
      api.getServicePackages(),
      api.getServices()
    ]).then(([pkgData, svcData]) => {
      setPackages(pkgData);
      setServices(svcData);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#070f1c] text-slate-100 pb-20 pt-24 md:pt-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-[15%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300">
            Comprehensive Catalogue
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
            Marketing, business support, and local visibility solutions designed for real-world business growth.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Practical business growth, not vague marketing talk. Online and offline visibility support in one place. Structured packages for startups, local businesses, and growth-stage operators.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/quotations" className="btn bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl px-6 py-3 transition-all">
              Get Custom Quotation
            </Link>
            <button className="btn bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-semibold rounded-xl px-6 py-3 flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-sm">Loading catalogue...</p>
          </div>
        ) : (
          <div className="space-y-24">

            {/* Universal Packages */}
            <section className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white font-display mb-3">Universal Service Packages</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Clear timelines, clear execution, and structured support for any stage of growth.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="glass-card p-6 flex flex-col relative group hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium tracking-wide mb-4 uppercase">BEST FOR: {pkg.targetAudience}</p>
                    <p className="text-sm text-slate-400 mb-6 flex-grow">{pkg.description}</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Scope</p>
                        <ul className="space-y-1.5">
                          {pkg.scope.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 shrink-0" /> {item}
                            </li>
                          ))}
                          {pkg.scope.length > 3 && <li className="text-xs text-slate-500 italic pl-2.5">...and more</li>}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1 font-bold text-lg text-white">
                        <IndianRupee className="w-4 h-4 text-slate-400" />
                        {parseInt(pkg.price, 10).toLocaleString('en-IN')}
                      </div>
                      <Link to="/quotations" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Select <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Offline Activation Offer */}
            <section className="relative glass-card p-8 md:p-12 overflow-hidden border-cyan-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 mb-4 font-semibold tracking-wide uppercase">
                    Offline Activation
                  </div>
                  <h2 className="text-3xl font-bold text-white font-display mb-4">Hydration with Trust</h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    A structured 7-day local visibility campaign combining clean drinking water distribution, branded presence, printed collateral, and business lead generation. Turn public goodwill into real business awareness.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {['High-footfall strategic placement', 'Clean, branded, professional tent setup', 'Physical to digital lead capture (QR & forms)', 'Universal minimum budget starting at 50,000 INR'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/offline-campaign" className="btn bg-white text-black hover:bg-slate-200 font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 w-fit">
                    View Campaign Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="aspect-video rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-cyan-500/20" />
                    <ShieldCheck className="w-20 h-20 text-white/20" />
                    <p className="absolute bottom-4 left-0 right-0 text-center text-xs font-semibold text-white/50 tracking-widest uppercase">Professional Local Setup</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Services Summary */}
            <section className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white font-display mb-3">Core Expertise</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Specialized services integrated into our growth packages.</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map((svc, idx) => (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    <p className="text-xs uppercase text-slate-500 mb-1 font-semibold tracking-wider">{svc.category.replace('_', ' ')}</p>
                    <h4 className="text-sm font-bold text-white">{svc.name}</h4>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
               <h2 className="text-2xl font-bold text-white font-display">Why Choose Shri Nandi?</h2>
               <p className="text-slate-400 leading-relaxed text-sm">
                 We bridge the gap between high-level strategy and ground-level execution. Our operations are tech-enabled, compliance-ready, and fiercely focused on measurable outcomes. You get a partner who understands the backend systems just as well as the frontline marketing.
               </p>
               <div className="pt-8">
                 <Link to="/certifications" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center justify-center gap-1 transition-colors">
                   View our Trust Stack & Certifications <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
            </section>

          </div>
        )}

      </div>
    </main>
  );
}
