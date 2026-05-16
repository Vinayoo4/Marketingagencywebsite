import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/#process', isAnchor: true },
  { label: 'Case Studies', to: '/#case-studies', isAnchor: true },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0b1220]/95 backdrop-blur">
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="min-w-0">
            <p className="text-sm sm:text-base font-semibold text-cyan-300 truncate">Shri Nandi Marketing Agency</p>
            <p className="text-xs text-slate-400 truncate">Practical marketing, e-commerce ops, and compliance support for real businesses.</p>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.isAnchor ? (
                <a key={item.label} href={item.to} className="text-sm text-slate-300 hover:text-cyan-300 transition-colors">
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm transition-colors ${location.pathname === item.to ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-300'}`}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-full transition-colors"
            >
              WhatsApp 8930609914
            </a>
          </div>

          <button
            className="md:hidden text-slate-200"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 space-y-3">
            {navItems.map((item) =>
              item.isAnchor ? (
                <a key={item.label} href={item.to} className="block text-sm text-slate-300" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className="block text-sm text-slate-300" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              )
            )}
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm font-semibold text-white bg-emerald-600 px-3 py-2 rounded-lg"
            >
              WhatsApp us at 8930609914
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
