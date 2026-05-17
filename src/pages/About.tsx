import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Lightbulb, Shield, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
  { label: 'Brands Served', value: '50+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Client Retention', value: '95%' },
  { label: 'Avg. Growth', value: '3x' },
];

const values = [
  { icon: Target, title: 'Practical First', desc: 'We focus on what actually works for your business, not vanity metrics.' },
  { icon: Lightbulb, title: 'Tech-Enabled', desc: 'AI and automation built into everything we do for efficiency.' },
  { icon: Shield, title: 'Compliance Ready', desc: 'GST, FSSAI, legal — we make sure your business is protected.' },
  { icon: TrendingUp, title: 'Growth Obsessed', desc: 'Every strategy is measured by real business outcomes.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

const About = () => {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container pt-16 pb-12 md:pt-24 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-xs text-violet-300 mb-6">
              About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
              Built by a <span className="glow-text">BTech AIML</span> professional who understands real business.
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
              We are a practical marketing and operations partner for small brands that need digital growth 
              and backend systems working together. Our work sits at the intersection of performance marketing, 
              e-commerce execution, and compliance support.
            </p>
          </motion.div>
        </div>
      </section>

      <motion.section {...fadeUp} className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold glow-text-cyan">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-white">Founder Story</h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              The agency is founded by a BTech AIML professional with hands-on e-commerce and operations experience. 
              This background helps us move beyond ad campaigns into process-driven execution that actually holds 
              up in real business conditions.
            </p>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              We started because we saw too many small businesses getting sold on flashy marketing without the 
              operational backbone to deliver. Our approach combines the analytical rigor of engineering with 
              the creativity of brand building.
            </p>
          </div>
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-white">Our Edge</h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Not just marketing; we understand systems, code, and compliance. That means fewer bottlenecks, 
              cleaner execution, and better long-term outcomes for founders and teams.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Deep e-commerce marketplace expertise (Flipkart, Meesho, Amazon)',
                'End-to-end compliance setup (GST, FSSAI, documentation)',
                'AI-powered automation for repetitive business tasks',
                'Data-driven strategy with measurable KPIs',
              ].map((item) => (
                <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="container py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          <p className="mt-3 text-slate-400">What drives everything we do.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <article key={v.title} className="glass-card p-6 text-center group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{v.desc}</p>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="container py-12 md:pb-20">
        <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s work together</h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Ready to take your brand to the next level? We&apos;re just a message away.
            </p>
            <Link to="/contact" className="mt-8 btn btn-primary gap-2 inline-flex">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
