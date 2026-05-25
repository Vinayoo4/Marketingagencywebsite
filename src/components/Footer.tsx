import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const services = [
  { label: 'E-Commerce Ops', to: '/services' },
  { label: 'Digital Marketing', to: '/services' },
  { label: 'Branding', to: '/services' },
  { label: 'AI Automation', to: '/services' },
  { label: 'Compliance', to: '/services' },
];

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#070f1c] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] via-transparent to-violet-500/[0.02] pointer-events-none" />
      <div className="container py-16 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">Shri Nandi</p>
                <p className="text-[10px] text-slate-400 -mt-0.5">Marketing Agency</p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              Practical marketing, e-commerce operations, and compliance support for small and medium businesses, D2C brands, and local retailers.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Fastest response via WhatsApp
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/918930609914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  +91 8930609914
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@shrinandimarketing.com"
                  className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  contact@shrinandimarketing.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                </span>
                Rewari, Haryana
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 relative z-10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Shri Nandi Marketing Agency. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with purpose for real businesses.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
