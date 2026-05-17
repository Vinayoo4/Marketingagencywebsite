import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { api, type Service, type Testimonial } from '../lib/api';

const processSteps = [
  { title: 'Discover', text: 'Understand your business, products, and current bottlenecks.', icon: Users },
  { title: 'Design', text: 'Create one combined plan for marketing, operations, and compliance.', icon: Shield },
  { title: 'Deploy', text: 'Set up accounts, content, campaigns, and internal systems.', icon: Zap },
  { title: 'Optimize', text: 'Run weekly or monthly reviews for steady improvements.', icon: TrendingUp },
];

const pricingPlans = [
  { name: 'Starter Launch Pack', desc: 'For solo founders and micro businesses.', price: '₹15,000', note: 'one-time', featured: false },
  { name: 'Growth Retainer', desc: 'For brands already selling but stuck.', price: '₹18k–₹45k', note: '/month', featured: true },
  { name: 'Ops & Compliance', desc: 'GST, FSSAI, and clean documentation.', price: 'Custom', note: 'by scope', featured: false },
  { name: 'Custom Project', desc: 'Tech + marketing + education combined.', price: 'Let\'s talk', note: 'free call', featured: false },
];

const faqItems = [
  { q: 'Who is this agency right for?', a: 'We work best with small and medium businesses, D2C brands, retailers, and education-focused ventures.' },
  { q: 'Do you work with early-stage businesses?', a: 'Yes. We support both idea-stage founders and growing teams with practical launch plans.' },
  { q: 'How long till results?', a: 'Early signals can appear in a few weeks; strong outcomes generally build over 2-3 months of disciplined execution.' },
  { q: 'How do we communicate?', a: 'We coordinate via WhatsApp, email, and scheduled calls based on your operating rhythm.' },
];

const caseStudies = [
  { title: 'Stationery Brand', challenge: 'No online sales process.', approach: 'Marketplace setup + listing system + launch plan.', outcome: '100 online orders in 30 days.' },
  { title: 'Organic Product Seller', challenge: 'Compliance blocking growth.', approach: 'GST + FSSAI + documentation workflow.', outcome: 'Operations stabilized, team focused on sales.' },
  { title: 'Student Founder', challenge: 'No structured go-to-market.', approach: 'Brand positioning + execution roadmap.', outcome: 'Turned into a registered, operational brand.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    void Promise.all([api.getServices(), api.getTestimonials()])
      .then(([serviceData, testimonialData]) => {
        setServices(serviceData);
        setTestimonials(testimonialData);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative pt-16 pb-12 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Rewari, Haryana — Serving India-wide
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight"
          >
            We turn small brands into{' '}
            <span className="glow-text">serious businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            Shri Nandi Marketing Agency combines digital marketing, e-commerce operations, 
            GST & FSSAI compliance, and AI-powered systems so your business grows without chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link to="/contact" className="btn btn-primary gap-2">
              Free 20-min consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: 8930609914
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400"
          >
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Flipkart & Meesho</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> B2B Wholesale</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Education Products</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Organic Brands</span>
          </motion.div>
        </div>
      </section>

      <motion.section {...fadeUp} className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Service Pillars</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">Everything you need to build, launch, and scale your brand.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card p-6 space-y-4">
                <div className="skeleton h-6 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="skeleton h-4 w-1/3" />
              </div>
            ))
          ) : (
            services.slice(0, 6).map((service, idx) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card p-6 group hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">{service.category.replace('_', ' ')}</p>
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">{service.name}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">{service.short_description}</p>
                <ul className="mt-4 space-y-2">
                  {service.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-slate-400">From ₹{service.starting_price_inr.toLocaleString('en-IN')}</span>
                  <Link to="/contact" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors font-medium">
                    Book a call &rarr;
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </motion.section>

      <motion.section {...stagger} id="case-studies" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Results & Case Snapshots</h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">Real work for real businesses.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-slate-500">Challenge:</span> <span className="text-slate-300">{item.challenge}</span></p>
                  <p><span className="text-slate-500">Approach:</span> <span className="text-slate-300">{item.approach}</span></p>
                  <p><span className="text-slate-500">Outcome:</span> <span className="text-emerald-400 font-medium">{item.outcome}</span></p>
                </div>
              </motion.article>
            ))}
          </div>

          {testimonials.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-8">What Clients Say</h3>
              <div className="grid gap-5 md:grid-cols-3">
                {testimonials.slice(0, 3).map((item) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <svg className="w-8 h-8 text-cyan-400/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm text-slate-300 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm font-medium text-cyan-300">{item.client_name}</p>
                      <p className="text-xs text-slate-500">{item.company} &middot; {item.result_summary}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section {...fadeUp} id="process" className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">A proven framework from discovery to growth.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 text-center group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-xs text-slate-500 mb-1">Step {idx + 1}</p>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.text}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section {...stagger} className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Pricing & Engagement</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">Simple, transparent pricing. No hidden fees.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`glass-card p-6 relative ${plan.featured ? 'ring-2 ring-cyan-400/40' : ''}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
              <p className="mt-4">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-slate-500 ml-1">{plan.note}</span>
              </p>
              <Link
                to="/contact"
                className={`mt-5 w-full btn text-center ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
              >
                Get started
              </Link>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">FAQs</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqItems.map((item, idx) => (
            <div key={item.q} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-sm font-medium text-white">{item.q}</span>
                <div className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${openFaq === idx ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...stagger} className="container py-16 md:py-20">
        <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to grow your business?</h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Book a free 20-minute consultation. No pitch — just practical advice for your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="btn btn-primary gap-2">
                Book free call <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918930609914"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp now
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
