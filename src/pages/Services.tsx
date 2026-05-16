import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api, type Service } from '../lib/api';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    void api.getServices().then(setServices).catch(() => undefined);
  }, []);

  return (
    <div className="container py-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Service pillars built for practical execution</h1>
        <p className="mt-4 text-slate-300">
          We combine growth, operations, and compliance so your team can move from scattered activity to measurable business progress.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service, idx) => (
          <motion.article
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="service-card"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">{service.category.replace('_', ' ')}</p>
            <h2 className="mt-1 text-2xl font-semibold text-cyan-300">{service.name}</h2>
            <p className="mt-3 text-sm text-slate-300">{service.short_description}</p>
            <p className="mt-3 text-sm text-slate-400"><span className="font-semibold text-slate-200">Who it&apos;s for:</span> {service.ideal_client}</p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-slate-300">
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-400">Starting at ₹{service.starting_price_inr.toLocaleString('en-IN')} · {service.delivery_timeframe}</p>
            <Link to="/contact" className="mt-4 inline-block text-sm text-cyan-300 hover:underline">
              Book a call
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Services;
