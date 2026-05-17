import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api, type Service, type Testimonial } from '../lib/api';

const processSteps = [
  {
    title: 'Discover',
    text: 'Understand your business, products, and current bottlenecks.',
  },
  {
    title: 'Design',
    text: 'Create one combined plan for marketing, operations, and compliance.',
  },
  {
    title: 'Deploy',
    text: 'Set up accounts, content, campaigns, and internal systems.',
  },
  {
    title: 'Optimize',
    text: 'Run weekly or monthly reviews for steady improvements.',
  },
];

const faqItems = [
  {
    q: 'Who is this agency right for?',
    a: 'We work best with small and medium businesses, D2C brands, retailers, and education-focused ventures.',
  },
  {
    q: 'Do you work with very early-stage businesses?',
    a: 'Yes. We support both idea-stage founders and growing teams with practical launch plans.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Early signals can appear in a few weeks; strong outcomes generally build over 2-3 months of disciplined execution.',
  },
  {
    q: 'How do we communicate?',
    a: 'We coordinate via WhatsApp, email, and scheduled calls based on your operating rhythm.',
  },
];

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    void Promise.all([api.getServices(), api.getTestimonials()])
      .then(([serviceData, testimonialData]) => {
        setServices(serviceData);
        setTestimonials(testimonialData);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div>
      <section className="container pt-16 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight"
        >
          We turn small brands into serious businesses.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-slate-300 max-w-3xl text-lg"
        >
          Shri Nandi Marketing Agency combines digital marketing, e-commerce operations, GST & FSSAI compliance,
          and AI-powered systems so your business grows without chaos.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/contact" className="btn btn-primary text-center">
            Get a free 20-minute consultation
          </Link>
          <a
            href="https://wa.me/918930609914"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-center"
          >
            WhatsApp us: 8930609914
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Experience with Flipkart, Meesho, B2B wholesale, education products, and organic brands.
        </p>
      </section>

      <section className="container py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 4).map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="service-card"
            >
              <h2 className="text-xl font-semibold text-cyan-300">{service.name}</h2>
              <p className="text-sm text-slate-400 mt-2">{service.ideal_client}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc pl-5">
                {service.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">Starts from ₹{service.starting_price_inr.toLocaleString('en-IN')}</p>
              <Link to="/contact" className="mt-4 inline-block text-cyan-300 text-sm hover:underline">
                Book a call
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="container py-12">
        <h2 className="text-2xl font-semibold">Results & case snapshots</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Stationery brand',
              challenge: 'No online sales process.',
              approach: 'Marketplace setup + listing system + launch plan.',
              outcome: 'First 100 online orders in 30 days.',
            },
            {
              title: 'Organic product seller',
              challenge: 'Compliance was blocking growth.',
              approach: 'GST + FSSAI + documentation workflow.',
              outcome: 'Operations stabilized, team focused on sales.',
            },
            {
              title: 'Student founder project',
              challenge: 'No structured go-to-market plan.',
              approach: 'Brand positioning + practical execution roadmap.',
              outcome: 'Turned into a registered, operational brand.',
            },
          ].map((item) => (
            <article key={item.title} className="shiva-card">
              <h3 className="text-lg font-semibold text-cyan-300">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300"><span className="font-semibold">Challenge:</span> {item.challenge}</p>
              <p className="mt-2 text-sm text-slate-300"><span className="font-semibold">Approach:</span> {item.approach}</p>
              <p className="mt-2 text-sm text-slate-300"><span className="font-semibold">Outcome:</span> {item.outcome}</p>
            </article>
          ))}
        </div>

        {testimonials.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <article key={item.id} className="service-card">
                <p className="text-sm text-slate-300">“{item.quote}”</p>
                <p className="mt-3 text-sm text-cyan-300">{item.client_name}, {item.company}</p>
                <p className="text-xs text-slate-500">{item.result_summary}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="process" className="container py-12">
        <h2 className="text-2xl font-semibold">Our process</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, idx) => (
            <article key={step.title} className="shiva-card">
              <p className="text-xs text-slate-500">Step {idx + 1}</p>
              <h3 className="text-lg font-semibold text-cyan-300 mt-1">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">Pricing & engagement models</h2>
        <p className="mt-2 text-slate-400 text-sm">We keep pricing simple and transparent. Below are starting ranges; actual quotes depend on your exact scope.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="service-card">
            <h3 className="text-lg font-semibold text-cyan-300">Starter Launch Pack</h3>
            <p className="mt-2 text-sm text-slate-300">For solo founders and micro businesses.</p>
            <p className="mt-3 text-sm text-slate-400">Starts from ₹15,000 (one-time).</p>
          </article>
          <article className="service-card">
            <h3 className="text-lg font-semibold text-cyan-300">Growth Marketing Retainer</h3>
            <p className="mt-2 text-sm text-slate-300">For brands already selling but stuck.</p>
            <p className="mt-3 text-sm text-slate-400">Typically ₹18,000–₹45,000 / month.</p>
          </article>
          <article className="service-card">
            <h3 className="text-lg font-semibold text-cyan-300">Operations & Compliance Setup</h3>
            <p className="mt-2 text-sm text-slate-300">For businesses needing GST, FSSAI, and clean documentation.</p>
            <p className="mt-3 text-sm text-slate-400">Custom pricing by product and license scope.</p>
          </article>
          <article className="service-card">
            <h3 className="text-lg font-semibold text-cyan-300">Custom Projects</h3>
            <p className="mt-2 text-sm text-slate-300">Tech + marketing + education content combined.</p>
            <Link to="/contact" className="mt-3 inline-block text-sm text-cyan-300 hover:underline">Book a free call to discuss</Link>
          </article>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.q} className="service-card">
              <h3 className="font-semibold text-cyan-300">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
