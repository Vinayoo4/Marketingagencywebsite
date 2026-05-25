import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { api, type InquiryPayload, type Service } from '../lib/api';

const initialForm: InquiryPayload = {
  name: '',
  email: '',
  phone: '',
  business_name: '',
  business_stage: 'idea',
  services_interested: [],
  message: '',
};

const Contact = () => {
  const [form, setForm] = useState<InquiryPayload>(initialForm);
  const [services, setServices] = useState<Service[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    void api.getServices().then(setServices).catch(() => undefined);
  }, []);

  const serviceOptions = useMemo(() => services.map((s) => s.name), [services]);

  const toggleService = (name: string) => {
    setForm((prev) => ({
      ...prev,
      services_interested: prev.services_interested.includes(name)
        ? prev.services_interested.filter((item) => item !== name)
        : [...prev.services_interested, name],
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\+?\d{10,15}$/.test(form.phone.replace(/[\s-]/g, ''))) errs.phone = 'Invalid phone number';
    if (!form.business_name.trim()) errs.business_name = 'Business name is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await api.createInquiry(form);
      setStatus('success');
      setForm(initialForm);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border ${errors[field] ? 'border-red-500/50' : 'border-white/10'} bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20`;

  if (status === 'success') {
    return (
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-lg mx-auto p-10 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Thank you!</h2>
          <p className="mt-3 text-sm text-slate-400">
            Your inquiry has been submitted. We&apos;ll get back to you within 24 hours.
          </p>
          <button onClick={() => setStatus('idle')} className="mt-6 btn btn-secondary">
            Submit another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-[20%] w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 left-[10%] w-[250px] h-[250px] bg-violet-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
        <div className="container relative pt-20 pb-16 md:pt-28 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400/10 to-violet-400/10 border border-cyan-400/20 text-xs text-cyan-300 mb-6">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-bold max-w-3xl leading-[1.05] tracking-tight font-display">
              Let&apos;s build your{' '}
              <span className="glow-text">growth plan</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Tell us your current stage and priorities. We&apos;ll recommend a practical action plan.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container pb-16 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-display">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/918930609914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </span>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-slate-500">+91 8930609914</p>
                  </div>
                </a>
                <a
                  href="tel:+918930609914"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </span>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-slate-500">+91 8930609914</p>
                  </div>
                </a>
                <a
                  href="mailto:contact@shrinandimarketing.com"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-violet-400" />
                  </span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-slate-500">contact@shrinandimarketing.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-400" />
                  </span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-slate-500">Rewari, Haryana</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-2 font-display">Fastest Response</h3>
              <p className="text-sm text-slate-400">We respond quickest on WhatsApp. Message us anytime.</p>
              <a
                href="https://wa.me/918930609914"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold text-white font-display">Get a Quotation</h2>
              <p className="mt-1 text-sm text-slate-400">Fill in the details and we&apos;ll get back to you.</p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className={inputClass('name')}
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      className={inputClass('email')}
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className={inputClass('phone')}
                      placeholder="WhatsApp number *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      className={inputClass('business_name')}
                      placeholder="Business name *"
                      value={form.business_name}
                      onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                    />
                    {errors.business_name && <p className="mt-1 text-xs text-red-400">{errors.business_name}</p>}
                  </div>
                </div>

                <select
                  className={inputClass('business_stage')}
                  value={form.business_stage}
                  onChange={(e) => setForm({ ...form, business_stage: e.target.value as InquiryPayload['business_stage'] })}
                >
                  <option value="idea">Idea stage</option>
                  <option value="early">Early traction</option>
                  <option value="growing">Growing</option>
                  <option value="established">Established</option>
                </select>

                <div>
                  <p className="text-sm text-slate-300 mb-2">What do you need help with?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceOptions.map((service, idx) => (
                      <motion.label
                        key={service}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                          form.services_interested.includes(service)
                            ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-300'
                            : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.services_interested.includes(service)}
                          onChange={() => toggleService(service)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          form.services_interested.includes(service)
                            ? 'bg-cyan-400 border-cyan-400'
                            : 'border-slate-600'
                        }`}>
                          {form.services_interested.includes(service) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        {service}
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    className={`${inputClass('message')} min-h-32 resize-y`}
                    placeholder="Describe your current stage, monthly revenue range, and goals *"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                <motion.button
                  className="btn btn-primary w-full gap-2"
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get a free 20-minute consultation
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Submission failed. Please WhatsApp us at 8930609914.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
