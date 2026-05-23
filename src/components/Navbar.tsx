import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const anchorLinks = [
  { label: 'Process', to: '/#process' },
  { label: 'Case Studies', to: '/#case-studies' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') return;
    e.preventDefault();
    const id = href.replace('/#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070f1c]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">Shri Nandi</p>
              <p className="text-[10px] text-slate-400 leading-tight -mt-0.5">Marketing Agency</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'text-cyan-300 bg-cyan-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                Explore <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 py-2 bg-[#0b1220]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {anchorLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => handleAnchorClick(e, item.to)}
                    className="block px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 px-4 py-2 rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              WhatsApp
            </a>
          </nav>

          <button
            className="md:hidden relative w-9 h-9 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-5 space-y-1 animate-fadeIn">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
                  location.pathname === item.to
                    ? 'text-cyan-300 bg-cyan-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {anchorLinks.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={(e) => { setOpen(false); handleAnchorClick(e, item.to); }}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/918930609914"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mx-4 mt-3 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              WhatsApp: 8930609914
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
