// src/pages/CareerDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiZap, FiClock, FiTrendingUp, FiCheck } from 'react-icons/fi';
import { getCareerBySlug } from '../services/api';

const TABS = ['Overview', 'Roadmap', 'Skills & Tools', 'Resources', 'Future Scope'];

export default function CareerDetail() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    setLoading(true);
    getCareerBySlug(slug)
      .then(r => setCareer(r.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #EEF2FF', borderTopColor: '#4F46E5', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#64748b' }}>Loading career details...</p>
    </div>
  );

  if (error || !career) return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>😕</div>
      <h2 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", marginBottom: 12 }}>Career not found</h2>
      <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 100%)', padding: '100px 0 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%,rgba(79,70,229,0.25) 0%,transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', marginBottom: 24, fontWeight: 500 }}>
            <FiArrowLeft size={14} /> Back to All Careers
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3.5rem' }}>{career.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(79,70,229,0.3)', color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99, border: '1px solid rgba(79,70,229,0.4)' }}>{career.category}</span>
                <span style={{ background: career.demandLevel === 'High' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: career.demandLevel === 'High' ? '#86efac' : '#fcd34d', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>
                  <FiTrendingUp size={10} style={{ display: 'inline', marginRight: 4 }} />{career.demandLevel} Demand
                </span>
              </div>
              <h1 style={{ color: 'white', fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 'clamp(1.8rem,3vw,2.6rem)', marginBottom: 12 }}>{career.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.7 }}>{career.description}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Salary Range', value: `₹${career.salaryRange?.min}–${career.salaryRange?.max} LPA`, bg: 'rgba(79,70,229,0.2)', color: '#a5b4fc' },
              { label: 'Duration', value: career.duration, icon: <FiClock size={12} />, bg: 'rgba(16,185,129,0.15)', color: '#6ee7b7' },
              { label: 'Job Demand', value: career.demandLevel, bg: 'rgba(245,158,11,0.15)', color: '#fcd34d' },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 12, padding: '12px 18px' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: s.color, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>{s.icon}{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 36, alignItems: 'start' }}>

          {/* Main content with tabs */}
          <div>
            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 32, borderBottom: '2px solid #e2e8f0', paddingBottom: 0, flexWrap: 'wrap' }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ padding: '10px 18px', border: 'none', background: 'none', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', color: activeTab === tab ? '#4F46E5' : '#64748b', borderBottom: activeTab === tab ? '2px solid #4F46E5' : '2px solid transparent', marginBottom: -2, transition: 'all 0.2s ease', fontFamily: 'inherit' }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {activeTab === 'Overview' && (
                <div>
                  <h3 style={contentStyles.h3}>About This Career</h3>
                  <p style={contentStyles.p}>{career.description}</p>
                  {career.futureScope && (
                    <>
                      <h3 style={contentStyles.h3}>Future Scope</h3>
                      <p style={contentStyles.p}>{career.futureScope}</p>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'Roadmap' && (
                <div>
                  <h3 style={contentStyles.h3}>Learning Roadmap</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 24 }}>
                    {career.roadmap?.map((stage, i) => (
                      <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} style={roadmapStyles.card}>
                        <div style={roadmapStyles.number}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                            <h4 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, color: '#1e1b4b' }}>{stage.stage}</h4>
                            <span style={{ fontSize: '0.75rem', background: '#EEF2FF', color: '#4F46E5', padding: '2px 10px', borderRadius: 99, fontWeight: 600 }}>{stage.duration}</span>
                          </div>
                          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {stage.topics?.map(t => (
                              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#475569', background: '#f8faff', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: 8 }}>
                                <FiCheck size={11} style={{ color: '#4F46E5' }} />{t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Skills & Tools' && (
                <div>
                  <h3 style={contentStyles.h3}>Skills Required</h3>
                  <div style={contentStyles.tagGrid}>
                    {career.skills?.map(s => (
                      <span key={s} style={contentStyles.skillTag}><FiCheck size={11} /> {s}</span>
                    ))}
                  </div>
                  <h3 style={{ ...contentStyles.h3, marginTop: 32 }}>Tools & Technologies</h3>
                  <div style={contentStyles.tagGrid}>
                    {career.tools?.map(t => (
                      <span key={t} style={{ ...contentStyles.skillTag, background: '#F3E8FF', color: '#7C3AED', borderColor: '#DDD6FE' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Resources' && (
                <div>
                  <h3 style={contentStyles.h3}>Learning Resources</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
                    {career.resources?.map(r => (
                      <a key={r.title} href={r.url} target="_blank" rel="noreferrer">
                        <motion.div style={resourceStyles.card} whileHover={{ x: 4, borderColor: '#4F46E5' }}>
                          <span style={{ ...resourceStyles.typeBadge, background: r.type === 'course' ? '#EEF2FF' : r.type === 'book' ? '#FEF3C7' : '#ECFDF5', color: r.type === 'course' ? '#4F46E5' : r.type === 'book' ? '#D97706' : '#059669' }}>{r.type}</span>
                          <span style={{ fontWeight: 600, color: '#1e1b4b', fontSize: '0.95rem' }}>{r.title}</span>
                          <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: 'auto' }}>→</span>
                        </motion.div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Future Scope' && (
                <div>
                  <h3 style={contentStyles.h3}>Future Scope & Trends</h3>
                  <p style={contentStyles.p}>{career.futureScope || 'Strong future scope with growing industry demand.'}</p>
                  <div style={{ background: 'linear-gradient(135deg,#EEF2FF,#F3E8FF)', borderRadius: 16, padding: 24, marginTop: 24 }}>
                    <h4 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, color: '#4F46E5', marginBottom: 10 }}>💡 AI Career Analysis</h4>
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7 }}>
                      This field is experiencing strong growth. Professionals with expertise in {career.skills?.slice(0, 2).join(' and ')} are especially sought after. The median salary is expected to grow 15-20% over the next 5 years based on current market trends.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 90 }}>
            {/* Salary */}
            <div style={sidebarStyles.card}>
              <h4 style={sidebarStyles.cardTitle}>💰 Salary Range (India)</h4>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: '2rem', background: 'linear-gradient(135deg,#4F46E5,#9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ₹{career.salaryRange?.min}–{career.salaryRange?.max} LPA
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>Per Annum (INR)</div>
              </div>
            </div>

            {/* Duration */}
            <div style={sidebarStyles.card}>
              <h4 style={sidebarStyles.cardTitle}>⏱ Time to First Job</h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>{career.duration}</p>
            </div>

            {/* AI Tutor CTA */}
            <Link to="/ai-tutor">
              <motion.div style={sidebarStyles.aiCard} whileHover={{ scale: 1.02 }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>🤖</div>
                <h4 style={{ color: 'white', fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, marginBottom: 8 }}>Ask AI Tutor</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginBottom: 14 }}>Get personalized advice about this career path instantly.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontWeight: 700, fontSize: '0.88rem' }}><FiZap size={14} /> Chat Now →</div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const contentStyles = {
  h3: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#1e1b4b', marginBottom: 14 },
  p: { color: '#475569', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20 },
  tagGrid: { display: 'flex', flexWrap: 'wrap', gap: 10 },
  skillTag: { display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, padding: '7px 14px', borderRadius: 10, background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE' },
};

const roadmapStyles = {
  card: { display: 'flex', gap: 16, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '20px 20px' },
  number: { width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: '0.95rem', flexShrink: 0 },
};

const resourceStyles = {
  card: { display: 'flex', alignItems: 'center', gap: 12, background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '14px 18px', transition: 'all 0.2s ease', cursor: 'pointer' },
  typeBadge: { fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 },
};

const sidebarStyles = {
  card: { background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: 22 },
  cardTitle: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#1e1b4b', marginBottom: 14 },
  aiCard: { background: 'linear-gradient(135deg,#4F46E5,#9333EA)', borderRadius: 16, padding: 24, cursor: 'pointer' },
};
