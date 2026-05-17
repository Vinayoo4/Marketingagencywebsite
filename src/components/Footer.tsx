const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-[#0b1220]">
      <div className="container py-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-cyan-300">Shri Nandi Marketing Agency</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Practical marketing, e-commerce operations, and compliance support for small and medium businesses,
            D2C brands, local retailers, and educational institutions.
          </p>
          <p className="mt-4 text-xs text-slate-500">Fastest response: WhatsApp 8930609914.</p>
        </div>

        <div className="text-sm text-slate-300 space-y-2">
          <p className="font-semibold text-cyan-200">Contact</p>
          <p>Agency name: Shri Nandi Marketing Agency</p>
          <p>
            WhatsApp: <a className="text-cyan-300 hover:underline" href="https://wa.me/918930609914" target="_blank" rel="noopener noreferrer">8930609914</a>
          </p>
          <p>
            Phone: <a className="text-cyan-300 hover:underline" href="tel:+918930609914">+91 8930609914</a>
          </p>
          <p>
            Email: <a className="text-cyan-300 hover:underline" href="mailto:contact@shrinandimarketing.com">contact@shrinandimarketing.com</a>
          </p>
          <p>City/State: Rewari, Haryana</p>
        </div>
      </div>
      <div className="container py-4 border-t border-slate-800 text-xs text-slate-500">
        © {new Date().getFullYear()} Shri Nandi Marketing Agency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
