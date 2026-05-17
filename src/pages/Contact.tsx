import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    void api.getServices().then(setServices).catch(() => undefined);
  }, []);

  const serviceOptions = useMemo(() => services.map((service) => service.name), [services]);

  const toggleService = (name: string) => {
    setForm((prev) => ({
      ...prev,
      services_interested: prev.services_interested.includes(name)
        ? prev.services_interested.filter((item) => item !== name)
        : [...prev.services_interested, name],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');

    try {
      await api.createInquiry(form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container py-14 grid gap-8 lg:grid-cols-2">
      <section>
        <h1 className="text-4xl font-bold">Contact us</h1>
        <p className="mt-4 text-slate-300">
          Tell us your current stage and priorities. We&apos;ll recommend a practical action plan.
        </p>

        <div className="mt-6 service-card space-y-3 text-sm text-slate-300">
          <p><span className="font-semibold">Agency:</span> Shri Nandi Marketing Agency</p>
          <p><span className="font-semibold">WhatsApp:</span> <a className="text-cyan-300 hover:underline" href="https://wa.me/918930609914" target="_blank" rel="noopener noreferrer">8930609914</a></p>
          <p><span className="font-semibold">Phone:</span> <a className="text-cyan-300 hover:underline" href="tel:+918930609914">+91 8930609914</a></p>
          <p><span className="font-semibold">Email:</span> <a className="text-cyan-300 hover:underline" href="mailto:contact@shrinandimarketing.com">contact@shrinandimarketing.com</a></p>
          <p><span className="font-semibold">Location:</span> Rewari, Haryana</p>
          <p className="text-slate-400">Fastest response: WhatsApp 8930609914.</p>
        </div>
      </section>

      <section className="service-card">
        <h2 className="text-2xl font-semibold text-cyan-300">Get a quotation</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Business name" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} required />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <select
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
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
              {serviceOptions.map((service) => (
                <label key={service} className="text-sm text-slate-300 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.services_interested.includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 min-h-28"
            placeholder="Describe your current business stage, monthly revenue range, and goals"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          <button className="btn btn-primary w-full" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Get a free 20-minute consultation'}
          </button>

          {status === 'success' && <p className="text-emerald-400 text-sm">Thanks, your request has been submitted.</p>}
          {status === 'error' && <p className="text-red-400 text-sm">Submission failed. Please WhatsApp us at 8930609914.</p>}
        </form>
      </section>
    </div>
  );
};

export default Contact;
