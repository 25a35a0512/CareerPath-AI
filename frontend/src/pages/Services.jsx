// src/pages/Services.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiCheck } from 'react-icons/fi';

const SERVICES = [
  {
    icon: '🧭',
    title: 'Career Counseling',
    subtitle: 'Personalized 1-on-1 Guidance',
    description: 'Get expert career counseling from certified professionals. We analyze your strengths, interests, and goals to chart the perfect career path.',
    benefits: ['Personalized 60-min video session', 'DMIT aptitude assessment included', 'Written career roadmap report', '30-day follow-up support'],
    color: '#4F46E5',
    bgGrad: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
    featured: true,
  },
  {
    icon: '📄',
    title: 'Resume Review',
    subtitle: 'ATS-Optimized Resume',
    description: 'Professional resume crafted to pass ATS filters and impress hiring managers. Tailored for your target role and industry.',
    benefits: ['ATS-optimized professional template', 'Unlimited revisions', 'LinkedIn profile optimization', 'Cover letter included'],
    color: '#9333EA',
    bgGrad: 'linear-gradient(135deg,#9333EA,#C026D3)',
    featured: false,
  },
  {
    icon: '🎤',
    title: 'Mock Interviews',
    subtitle: 'Crack Any Interview',
    description: 'Practice with industry experts who simulate real interview conditions. Get detailed feedback and tips to ace campus placements and job interviews.',
    benefits: ['5 mock interview sessions', 'HR + Technical rounds', 'Group Discussion training', 'Video recording for review'],
    color: '#06B6D4',
    bgGrad: 'linear-gradient(135deg,#06B6D4,#0891B2)',
    featured: false,
  },
  {
    icon: '🧪',
    title: 'Skill Assessment',
    subtitle: 'Know Your Strengths',
    description: 'Scientifically designed aptitude and skill assessment to discover your natural talents and learning style.',
    benefits: ['45-min online assessment', '15+ parameter evaluation', 'Detailed 20-page PDF report', 'AI career alignment analysis'],
    color: '#10B981',
    bgGrad: 'linear-gradient(135deg,#10B981,#059669)',
    featured: false,
  },
  {
    icon: '🛣️',
    title: 'Personalized Roadmap',
    subtitle: 'Step-by-Step Learning Plan',
    description: 'AI-generated, expert-reviewed personalized roadmaps from beginner to job-ready, with timelines and resources.',
    benefits: ['Beginner → Advanced stages', 'Free & paid resource recommendations', 'Project ideas for portfolio', 'Progress tracking checkpoints'],
    color: '#F59E0B',
    bgGrad: 'linear-gradient(135deg,#F59E0B,#D97706)',
    featured: false,
  },
];

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55 } };

export default function Services() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}>What We Offer</span>
            <h1>Our Career Services</h1>
            <p>Comprehensive support from course selection to landing your dream job</p>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section style={{ padding: '72px 0', background: 'white' }}>
        <div className="container">
          <motion.div style={styles.grid} variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {SERVICES.map((svc) => (
              <motion.div key={svc.title} variants={fadeUp}>
                <motion.div style={{ ...styles.card, ...(svc.featured ? styles.featuredCard : {}) }} whileHover={{ y: -8, boxShadow: `0 24px 64px ${svc.color}22` }}>
                  {svc.featured && (
                    <div style={styles.popularBadge}><FiZap size={11} /> Most Popular</div>
                  )}

                  <div style={{ ...styles.iconBox, background: svc.featured ? 'rgba(255,255,255,0.15)' : `${svc.color}15` }}>
                    <span style={{ fontSize: '1.8rem' }}>{svc.icon}</span>
                  </div>

                  <h3 style={{ ...styles.cardTitle, color: svc.featured ? 'white' : '#1e1b4b' }}>{svc.title}</h3>
                  <p style={{ ...styles.cardSub, color: svc.featured ? 'rgba(255,255,255,0.7)' : svc.color, fontWeight: 600, fontSize: '0.82rem' }}>{svc.subtitle}</p>
                  <p style={{ ...styles.cardDesc, color: svc.featured ? 'rgba(255,255,255,0.78)' : '#64748b' }}>{svc.description}</p>

                  <ul style={styles.benefits}>
                    {svc.benefits.map(b => (
                      <li key={b} style={styles.benefit}>
                        <span style={{ ...styles.checkIcon, background: svc.featured ? 'rgba(255,255,255,0.2)' : `${svc.color}15`, color: svc.featured ? 'white' : svc.color }}>
                          <FiCheck size={10} />
                        </span>
                        <span style={{ color: svc.featured ? 'rgba(255,255,255,0.85)' : '#475569', fontSize: '0.88rem' }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <motion.button style={{ ...styles.cta, background: svc.featured ? 'white' : svc.bgGrad, color: svc.featured ? svc.color : 'white', boxShadow: svc.featured ? 'none' : `0 4px 16px ${svc.color}35` }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      Get Started <FiArrowRight size={14} />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Tutor Banner */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <motion.div style={bannerStyles.card} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🤖</div>
              <h2 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", color: 'white', fontSize: 'clamp(1.5rem,3vw,2.2rem)', marginBottom: 12 }}>
                Try AI Career Guidance — Free
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', maxWidth: 500, margin: '0 auto 28px' }}>
                Get instant career advice, skill gap analysis, and personalized roadmaps without any signup.
              </p>
              <Link to="/ai-tutor">
                <motion.button style={bannerStyles.btn} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <FiZap size={16} /> Start AI Chat Free <FiArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 },
  card: { background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 22, padding: '32px 28px', transition: 'all 0.35s ease', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 0, height: '100%' },
  featuredCard: { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', borderColor: 'transparent' },
  popularBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 99, marginBottom: 16, width: 'fit-content' },
  iconBox: { width: 60, height: 60, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  cardTitle: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: '1.2rem', marginBottom: 4 },
  cardSub: { marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' },
  cardDesc: { fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 18 },
  benefits: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22, flex: 1 },
  benefit: { display: 'flex', alignItems: 'flex-start', gap: 10 },
  checkIcon: { width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  cta: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px', borderRadius: 12, fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: 'auto' },
};

const bannerStyles = {
  card: { background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 100%)', borderRadius: 28, padding: '60px 40px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(79,70,229,0.2)' },
  btn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', color: 'white', fontWeight: 700, fontSize: '0.98rem', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(79,70,229,0.4)', fontFamily: 'inherit' },
};
