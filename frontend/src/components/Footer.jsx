// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FiZap, FiTwitter, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      {/* Top gradient bar */}
      <div style={styles.topBar} />

      <div className="container">
        <div style={styles.grid}>
          {/* Brand */}
          <div>
            <Link to="/" style={styles.logo}>
              <div style={styles.logoIcon}><FiZap size={16} /></div>
              CareerPath <span style={{ color: '#06B6D4' }}>AI</span>
            </Link>
            <p style={styles.tagline}>Empowering students to discover their ideal career path through AI-powered guidance and personalized insights.</p>
            <div style={styles.socialRow}>
              {[FiTwitter, FiLinkedin, FiGithub, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" style={styles.socialBtn} onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,70,229,0.3)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={styles.colTitle}>Platform</h4>
            <ul style={styles.linkList}>
              {[['Home', '/'], ['Courses', '/courses'], ['Services', '/services'], ['AI Tutor', '/ai-tutor'], ['Contact', '/contact']].map(([label, path]) => (
                <li key={path}><Link to={path} style={styles.footerLink} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h4 style={styles.colTitle}>Popular Careers</h4>
            <ul style={styles.linkList}>
              {['Full-Stack Developer', 'Data Scientist', 'UI/UX Designer', 'Cybersecurity', 'Product Manager', 'Digital Marketing'].map(c => (
                <li key={c}><a href="/courses" style={styles.footerLink} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={styles.colTitle}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>📧 hello@careerpath.ai</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>📞 +91 800-123-4567</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>📍 New Delhi, India</p>
              <Link to="/ai-tutor" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>
                <FiZap size={14} /> Try AI Tutor Free
              </Link>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copy}>© {year} CareerPath AI. All rights reserved. Made with ❤️ for students.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(t => (
              <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: '#0F0F1A', paddingTop: 60, paddingBottom: 0, marginTop: 80 },
  topBar: { height: 3, background: 'linear-gradient(90deg,#4F46E5,#9333EA,#06B6D4)', marginBottom: 60 },
  logo: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 900, fontSize: '1.25rem', color: 'white', marginBottom: 14 },
  logoIcon: { width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
  tagline: { color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 260, marginBottom: 20 },
  socialRow: { display: 'flex', gap: 8 },
  socialBtn: { width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s ease' },
  grid: { display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 40, paddingBottom: 50 },
  colTitle: { fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 },
  linkList: { display: 'flex', flexDirection: 'column', gap: 10 },
  footerLink: { color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', transition: 'color 0.2s ease' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.06)', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
  copy: { color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' },
};
