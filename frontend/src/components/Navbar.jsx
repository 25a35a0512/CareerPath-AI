// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiZap } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  { label: 'AI Tutor', path: '/ai-tutor', special: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <motion.nav
        style={navStyles.nav(scrolled)}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container" style={navStyles.container}>
          {/* Logo */}
          <Link to="/" style={navStyles.logo}>
            <motion.div
              style={navStyles.logoIcon}
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <FiZap size={16} />
            </motion.div>
            Career<span style={{ background: 'linear-gradient(90deg,#4F46E5,#9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Path</span>
            <span style={{ color: '#06B6D4' }}> AI</span>
          </Link>

          {/* Desktop nav */}
          <ul style={navStyles.links}>
            {navLinks.map((link) => (
              <li key={link.path}>
                {link.special ? (
                  <Link to={link.path}>
                    <motion.span
                      style={navStyles.aiBtn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiZap size={14} /> {link.label}
                    </motion.span>
                  </Link>
                ) : (
                  <Link to={link.path} style={navStyles.link(isActive(link.path))}>
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div style={navStyles.activeBar} layoutId="activeBar" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <motion.button
            style={navStyles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <FiX size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <FiMenu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={navStyles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.path}
                  style={{
                    ...navStyles.mobileLink,
                    background: isActive(link.path) ? 'rgba(79,70,229,0.08)' : 'transparent',
                    color: link.special ? '#4F46E5' : isActive(link.path) ? '#4F46E5' : '#1e1b4b',
                    fontWeight: link.special || isActive(link.path) ? 700 : 500,
                  }}
                >
                  {link.special && <FiZap size={14} />} {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const navStyles = {
  nav: (scrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(16px)',
    borderBottom: scrolled ? '1px solid rgba(79,70,229,0.12)' : '1px solid rgba(255,255,255,0.3)',
    boxShadow: scrolled ? '0 4px 24px rgba(79,70,229,0.08)' : 'none',
    transition: 'all 0.3s ease',
  }),
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontWeight: 900,
    fontSize: '1.35rem',
    color: '#0F0F1A',
    letterSpacing: '-0.02em',
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: 'linear-gradient(135deg,#4F46E5,#9333EA)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    '@media(max-width:768px)': { display: 'none' },
  },
  link: (active) => ({
    position: 'relative',
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: '0.92rem',
    fontWeight: active ? 700 : 500,
    color: active ? '#4F46E5' : '#374151',
    background: active ? 'rgba(79,70,229,0.06)' : 'transparent',
    transition: 'all 0.2s ease',
    display: 'block',
  }),
  activeBar: {
    position: 'absolute',
    bottom: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 18,
    height: 2,
    borderRadius: 1,
    background: 'linear-gradient(90deg,#4F46E5,#9333EA)',
  },
  aiBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 18px',
    borderRadius: 10,
    fontSize: '0.88rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg,#4F46E5,#9333EA)',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(79,70,229,0.3)',
    marginLeft: 8,
  },
  hamburger: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
    background: 'rgba(79,70,229,0.08)',
    color: '#4F46E5',
    '@media(max-width:768px)': { display: 'flex' },
  },
  mobileMenu: {
    position: 'fixed',
    top: 72,
    left: 0,
    right: 0,
    zIndex: 999,
    background: 'rgba(255,255,255,0.97)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(79,70,229,0.1)',
    padding: '12px 16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    boxShadow: '0 8px 32px rgba(79,70,229,0.1)',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderRadius: 10,
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  },
};

// CSS for hamburger on mobile (inject via style tag workaround)
const styleEl = document.createElement('style');
styleEl.textContent = `
  @media (max-width: 768px) {
    nav ul { display: none !important; }
    button[aria-label="Toggle menu"] { display: flex !important; }
  }
  @media (min-width: 769px) {
    button[aria-label="Toggle menu"] { display: none !important; }
  }
`;
document.head.appendChild(styleEl);
