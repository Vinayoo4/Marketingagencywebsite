import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
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
import Quotations from './pages/Quotations';
import Catalogue from './pages/Catalogue';
import OfflineCampaign from './pages/OfflineCampaign';

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
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/offline-campaign" element={<OfflineCampaign />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certifications" element={<CertTreePage />} />
            <Route path="/admin" element={isAdminEnabled ? <Admin /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        {/* Removed fixed bottom-right WhatsApp button as per request to clear up UI space. Added it effectively in Navbar/Contact sections */}
      </div>
    </Router>
  );
}

export default App;
