// src/App.js
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CareerDetail from './pages/CareerDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AITutor from './pages/AITutor';

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function AppRoutes() {
  const location = useLocation();
  const isAITutor = location.pathname === '/ai-tutor';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
          <Route path="/courses/:slug" element={<PageTransition><CareerDetail /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/ai-tutor" element={<PageTransition><AITutor /></PageTransition>} />
          <Route path="*" element={
            <PageTransition>
              <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: '5rem', opacity: 0.15, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900 }}>404</div>
                <h1 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: '2rem', color: '#1e1b4b', marginBottom: 12 }}>Page Not Found</h1>
                <p style={{ color: '#64748b', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </div>
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
      {!isAITutor && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
