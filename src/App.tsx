import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const isAdminEnabled = import.meta.env.VITE_ENABLE_ADMIN !== 'false';

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={isAdminEnabled ? <Admin /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <a
          href="https://wa.me/918930609914"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 bg-emerald-500 text-white text-sm font-semibold shadow-lg hover:bg-emerald-400 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          Chat on WhatsApp
        </a>
      </div>
    </Router>
  );
}

export default App;
