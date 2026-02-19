// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiStar, FiUsers, FiTrendingUp, FiShield, FiBook, FiTarget, FiAward } from 'react-icons/fi';
import { getCareers } from '../services/api';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const CATEGORIES = [
  { icon: '💻', label: 'Technology', color: '#4F46E5' },
  { icon: '📊', label: 'Business', color: '#9333EA' },
  { icon: '🎨', label: 'Creative', color: '#06B6D4' },
  { icon: '🏥', label: 'Healthcare', color: '#10B981' },
  { icon: '🔬', label: 'Science', color: '#F59E0B' },
  { icon: '💰', label: 'Finance', color: '#EF4444' },
];

const WHY_US = [
  { icon: <FiZap />, title: 'AI-Powered Guidance', desc: 'Get personalized career recommendations powered by the latest AI technology.' },
  { icon: <FiTarget />, title: 'Skill Gap Analysis', desc: 'Identify missing skills and get a clear roadmap to bridge the gap.' },
  { icon: <FiTrendingUp />, title: 'Salary Insights', desc: 'Real-time salary data and industry trends to make informed decisions.' },
  { icon: <FiShield />, title: 'Expert Vetted', desc: 'All career paths reviewed by industry professionals and career counselors.' },
  { icon: <FiUsers />, title: '10K+ Students', desc: 'Join thousands of students who found their career path with us.' },
  { icon: <FiAward />, title: 'Free to Start', desc: 'Explore careers, use AI tutor, and get guidance — all free.' },
];

export default function Home() {
  const [featuredCareers, setFeaturedCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareers({ featured: true })
      .then(r => setFeaturedCareers(r.data.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section style={heroStyles.section}>
        {/* Animated background blobs */}
        <div style={heroStyles.blob1} />
        <div style={heroStyles.blob2} />
        <div style={heroStyles.blob3} />
        <div style={heroStyles.grid} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '120px', paddingBottom: '100px' }}>
          <motion.div {...fadeUp}>
            <motion.div
              style={heroStyles.badge}
              animate={{ boxShadow: ['0 0 20px rgba(79,70,229,0.2)', '0 0 40px rgba(147,51,234,0.4)', '0 0 20px rgba(79,70,229,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FiZap size={13} /> AI-Powered Career Guidance · Free Forever
            </motion.div>
          </motion.div>

          <motion.h1 style={heroStyles.h1} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Find Your{' '}
            <span className="gradient-text">Perfect Career</span>
            <br />with the Power of AI
          </motion.h1>

          <motion.p style={heroStyles.sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            Get personalized career recommendations, skill gap analysis, roadmaps,<br />
            and instant guidance from our AI tutor — all in one place.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <Link to="/courses">
              <motion.button className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FiBook size={16} /> Explore Careers
              </motion.button>
            </Link>
            <Link to="/ai-tutor">
              <motion.button className="btn btn-ghost" style={{ padding: '14px 32px', fontSize: '1rem' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <FiZap size={16} /> Try AI Tutor Free
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div style={heroStyles.statsRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            {[['10K+', 'Students Guided'], ['50+', 'Career Paths'], ['4.9★', 'Student Rating'], ['Free', 'To Get Started']].map(([num, label]) => (
              <div key={label} style={heroStyles.statItem}>
                <div style={heroStyles.statNum}>{num}</div>
                <div style={heroStyles.statLabel}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CAREER CATEGORIES ───────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 48 }} {...fadeUp} viewport={{ once: true }}>
            <span className="section-label">Explore By Domain</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', marginBottom: 12 }}>
              Career <span className="gradient-text">Categories</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: 520, margin: '0 auto' }}>Choose your field of interest and discover tailored career paths, skill requirements, and salary insights.</p>
          </motion.div>

          <motion.div style={catStyles.grid} variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.label} variants={fadeUp}>
                <Link to={`/courses?category=${cat.label}`}>
                  <motion.div style={catStyles.card} whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(79,70,229,0.14)' }}>
                    <div style={{ ...catStyles.iconWrap, background: cat.color + '15' }}>
                      <span style={{ fontSize: '1.8rem' }}>{cat.icon}</span>
                    </div>
                    <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#1e1b4b' }}>{cat.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>Explore →</div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED CAREERS ────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#f8faff' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 48 }} {...fadeUp} viewport={{ once: true }}>
            <span className="section-label">Top Picks</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', marginBottom: 12 }}>
              Trending <span className="gradient-text">Career Paths</span>
            </h2>
          </motion.div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 260, borderRadius: 20, background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              ))}
            </div>
          ) : (
            <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }} variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {featuredCareers.map((career) => (
                <motion.div key={career._id} variants={fadeUp}>
                  <Link to={`/courses/${career.slug}`}>
                    <motion.div style={careerCardStyles.card} whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(79,70,229,0.18)' }}>
                      <div style={careerCardStyles.header}>
                        <span style={{ fontSize: '2.4rem' }}>{career.icon}</span>
                        <span style={{ ...careerCardStyles.demandBadge, background: career.demandLevel === 'High' ? '#dcfce7' : '#fef3c7', color: career.demandLevel === 'High' ? '#16a34a' : '#d97706' }}>
                          {career.demandLevel} Demand
                        </span>
                      </div>
                      <h3 style={careerCardStyles.title}>{career.title}</h3>
                      <p style={careerCardStyles.desc}>{career.description?.substring(0, 100)}...</p>
                      <div style={careerCardStyles.meta}>
                        <span style={careerCardStyles.salary}>₹{career.salaryRange?.min}–{career.salaryRange?.max} LPA</span>
                        <span style={careerCardStyles.duration}>{career.duration}</span>
                      </div>
                      <div style={careerCardStyles.learnMore}>
                        View Roadmap <FiArrowRight size={14} />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/courses">
              <motion.button className="btn btn-outline" whileHover={{ scale: 1.04 }}>
                View All Careers <FiArrowRight size={15} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 56 }} {...fadeUp} viewport={{ once: true }}>
            <span className="section-label">Why CareerPath AI?</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', marginBottom: 12 }}>
              Built for <span className="gradient-text">Student Success</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto' }}>Every feature is thoughtfully designed to help you make the best career decision of your life.</p>
          </motion.div>

          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }} variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {WHY_US.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <motion.div style={whyStyles.card} whileHover={{ y: -4, borderColor: '#4F46E5' }}>
                  <div style={whyStyles.icon}>{item.icon}</div>
                  <h3 style={whyStyles.title}>{item.title}</h3>
                  <p style={whyStyles.desc}>{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── AI TUTOR CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div style={ctaStyles.card} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div style={ctaStyles.blobs}>
              <div style={ctaStyles.blob1} />
              <div style={ctaStyles.blob2} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <motion.div style={{ fontSize: '3rem', marginBottom: 16 }} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>🤖</motion.div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'white', marginBottom: 14, fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                Meet Your AI Career Tutor
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 32px' }}>
                Get personalized career advice, skill gap analysis, roadmaps, and instant answers — available 24/7.
              </p>
              <Link to="/ai-tutor">
                <motion.button style={ctaStyles.btn} whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.97 }}>
                  <FiZap size={18} /> Start Chatting Free <FiArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────────────────────── */
const heroStyles = {
  section: { background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 60%,#16213E 100%)', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' },
  blob1: { position: 'absolute', width: 600, height: 600, top: -150, left: -150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,70,229,0.2) 0%,transparent 70%)', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' },
  blob2: { position: 'absolute', width: 500, height: 500, top: '20%', right: -100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,51,234,0.18) 0%,transparent 70%)', filter: 'blur(40px)', animation: 'float 10s ease-in-out infinite reverse' },
  blob3: { position: 'absolute', width: 400, height: 400, bottom: -100, left: '40%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,0.15) 0%,transparent 70%)', filter: 'blur(40px)' },
  grid: { position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '50px 50px' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 99, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 28, backdropFilter: 'blur(8px)' },
  h1: { fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'white', marginBottom: 20, fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.12 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(1rem,1.5vw,1.15rem)', marginBottom: 36, lineHeight: 1.7 },
  statsRow: { display: 'flex', justifyContent: 'center', gap: 48, marginTop: 60, flexWrap: 'wrap' },
  statItem: { textAlign: 'center' },
  statNum: { fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 900, fontSize: '1.8rem', color: 'white', marginBottom: 4 },
  statLabel: { color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', letterSpacing: '0.06em' },
};

const catStyles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16 },
  card: { background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: '28px 16px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer' },
  iconWrap: { width: 60, height: 60, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' },
};

const careerCardStyles = {
  card: { background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 28, transition: 'all 0.35s ease', cursor: 'pointer', height: '100%' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  demandBadge: { fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 99, letterSpacing: '0.05em' },
  title: { fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#1e1b4b', marginBottom: 10 },
  desc: { color: '#64748b', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 16 },
  meta: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  salary: { background: '#EEF2FF', color: '#4F46E5', fontSize: '0.78rem', fontWeight: 700, padding: '4px 10px', borderRadius: 8 },
  duration: { background: '#f0fdf4', color: '#16a34a', fontSize: '0.78rem', fontWeight: 600, padding: '4px 10px', borderRadius: 8 },
  learnMore: { display: 'flex', alignItems: 'center', gap: 6, color: '#4F46E5', fontWeight: 700, fontSize: '0.88rem' },
};

const whyStyles = {
  card: { background: '#f8faff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '28px 24px', transition: 'all 0.3s ease', cursor: 'default' },
  icon: { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#EEF2FF,#F3E8FF)', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: 14 },
  title: { fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#1e1b4b', marginBottom: 8 },
  desc: { color: '#64748b', fontSize: '0.88rem', lineHeight: 1.65 },
};

const ctaStyles = {
  card: { background: 'linear-gradient(135deg,#4F46E5 0%,#7C3AED 50%,#9333EA 100%)', borderRadius: 28, padding: '70px 40px', position: 'relative', overflow: 'hidden' },
  blobs: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  blob1: { position: 'absolute', width: 400, height: 400, top: -150, right: -100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%)' },
  blob2: { position: 'absolute', width: 300, height: 300, bottom: -100, left: -50, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,0.2) 0%,transparent 70%)' },
  btn: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 36px', borderRadius: 14, background: 'white', color: '#4F46E5', fontWeight: 800, fontSize: '1.05rem', fontFamily: "'Cabinet Grotesk', sans-serif", boxShadow: '0 8px 32px rgba(0,0,0,0.2)', cursor: 'pointer', border: 'none' },
};
