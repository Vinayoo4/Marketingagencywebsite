import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, IndianRupee } from 'lucide-react';
import { api, type Service } from '../lib/api';

const categoryLabels: Record<string, string> = {
  all: 'All Services',
  ecommerce_ops: 'E-Commerce Ops',
  marketing: 'Digital Marketing',
  branding: 'Branding',
  ai_automation: 'AI & Automation',
  compliance: 'Compliance',
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void api.getServices()
      .then(setServices)
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => activeFilter === 'all' ? services : services.filter((s) => s.category === activeFilter),
    [services, activeFilter]
  );

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container pt-16 pb-12 md:pt-24 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight">
              Service pillars built for{' '}
              <span className="glow-text">practical execution</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              We combine growth, operations, and compliance so your team can move from scattered activity to measurable business progress.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container pb-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 border border-white/5 hover:border-white/10 hover:text-slate-200 bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-6 space-y-4">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-6 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="skeleton h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((service, idx) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="glass-card p-6 md:p-8 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">{service.category.replace('_', ' ')}</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors">{service.name}</h2>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{service.short_description}</p>
                <p className="mt-3 text-sm text-slate-400">
                  <span className="font-medium text-slate-200">Who it&apos;s for:</span> {service.ideal_client}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.highlights.map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <IndianRupee className="w-4 h-4" />
                      {service.starting_price_inr.toLocaleString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-4 h-4" />
                      {service.delivery_timeframe}
                    </span>
                  </div>
                  <Link
                    to="/contact"
                    className="text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1"
                  >
                    Book a call <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">No services found for this category.</p>
          </div>
        )}
      </section>

      <section className="container pb-16 md:pb-20">
        <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold">Not sure which service fits?</h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Tell us about your business and we&apos;ll recommend the right approach.
            </p>
            <Link to="/contact" className="mt-8 btn btn-primary gap-2 inline-flex">
              Get free consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
