import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, TrendingUp, Users, Shield, Zap, Star, ChevronDown } from 'lucide-react';
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
  { name: 'Custom Project', desc: 'Tech + marketing + education combined.', price: "Let's talk", note: 'free call', featured: false },
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-20 right-[5%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-full blur-[200px] animate-drift pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

        <div className="container relative pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400/10 to-violet-400/10 border border-cyan-400/20 text-xs text-cyan-300 mb-6 hover:border-cyan-400/40 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Rewari, Haryana — Serving India-wide
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl leading-[1.05] tracking-tight font-display"
          >
            We turn small brands into{' '}
            <span className="glow-text text-gradient-animate">serious businesses</span>
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
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact" className="btn btn-primary gap-2 text-base px-8 py-4">
              Free 20-min consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary gap-2 text-base px-8 py-4"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 8930609914
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400"
          >
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Flipkart & Meesho</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> B2B Wholesale</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Education Products</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Organic Brands</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <ChevronDown className="w-6 h-6 text-slate-500 animate-float" />
          </motion.div>
        </div>
      </section>

      <motion.section {...stagger} className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display">Service Pillars</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">Everything you need to build, launch, and scale your brand.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-6 space-y-4" style={{ animationDelay: `${i * 0.1}s` }}>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                <div className="relative glass-card p-6 group-hover:-translate-y-1">
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
                    <Link to="/contact" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors font-medium inline-flex items-center gap-1">
                      Book a call <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </motion.section>

      <motion.section {...stagger} id="case-studies" className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">Proven Results</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Results & Case Snapshots</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">Real work for real businesses.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                <div className="relative glass-card p-6 group-hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Challenge:</span> <span className="text-slate-300">{item.challenge}</span></p>
                    <p><span className="text-slate-500">Approach:</span> <span className="text-slate-300">{item.approach}</span></p>
                    <p><span className="text-slate-500">Outcome:</span> <span className="text-emerald-400 font-medium">{item.outcome}</span></p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {testimonials.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-center mb-10 font-display">What Clients Say</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.slice(0, 3).map((item, idx) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
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

      <motion.section {...stagger} id="process" className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">How We Work</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display">Our Process</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">A proven framework from discovery to growth.</p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 hidden md:block" />
          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="glass-card p-6 text-center group-hover:-translate-y-1">
                    <div className="relative mx-auto mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section {...stagger} className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">Investment</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display">Pricing & Engagement</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">Simple, transparent pricing. No hidden fees.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, idx) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`glass-card p-6 relative group ${plan.featured ? 'ring-2 ring-cyan-400/40' : ''}`}
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
                className={`mt-5 w-full btn text-center group-hover:scale-[1.02] transition-transform ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
              >
                Get started
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section {...stagger} className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display">FAQs</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqItems.map((item, idx) => (
            <div key={item.q} className="glass-card overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
              >
                <span className="text-sm font-medium text-white">{item.q}</span>
                <div className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 ${openFaq === idx ? 'rotate-180 bg-cyan-400/10' : ''}`}>
                  <ChevronDown className={`w-4 h-4 transition-colors ${openFaq === idx ? 'text-cyan-400' : 'text-slate-400'}`} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...stagger} className="container py-20 md:py-28">
        <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold font-display">Ready to grow your business?</h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Book a free 20-minute consultation. No pitch — just practical advice for your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn btn-primary gap-2 text-base px-8 py-4">
                Book free call <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/918930609914"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2 text-base px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
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
