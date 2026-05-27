import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Particles from './components/Particles';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CertTreePage from './pages/CertTreePage';

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const isUnlocked = sessionStorage.getItem('admin_unlocked') === 'true';
  const hasToken = !!localStorage.getItem('snma_admin_token');
  if (!isUnlocked && !hasToken) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const isAdminEnabled = import.meta.env.VITE_ENABLE_ADMIN !== 'false';

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Particles />
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certifications" element={<CertTreePage />} />
            <Route path="/admin" element={isAdminEnabled ? <ProtectedAdminRoute><Admin /></ProtectedAdminRoute> : <Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <a
          href="https://wa.me/918930609914"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    </Router>
  );
}

export default App;
