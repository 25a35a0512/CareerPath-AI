// src/pages/Courses.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiArrowRight, FiClock, FiTrendingUp } from 'react-icons/fi';
import { getCareers } from '../services/api';

const CATEGORIES = ['All', 'Technology', 'Business', 'Creative', 'Science', 'Finance', 'Healthcare', 'Education'];

export default function Courses() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'All' ? { category: activeCategory } : {};
    getCareers(params)
      .then(r => setCareers(r.data.data))
      .catch(() => setCareers([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const filtered = careers.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}>Career Explorer</span>
            <h1>Explore Career Paths</h1>
            <p>Detailed roadmaps, salary data, and AI-powered guidance for every career</p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {/* Search + Filter */}
        <motion.div style={styles.controls} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {/* Search */}
          <div style={styles.searchWrap}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search careers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Category filter */}
          <div style={styles.filters}>
            <FiFilter size={14} style={{ color: '#64748b' }} />
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                style={{ ...styles.filterBtn, ...(activeCategory === cat ? styles.filterBtnActive : {}) }}
                onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div style={{ marginBottom: 24, color: '#64748b', fontSize: '0.9rem' }}>
          {loading ? 'Loading...' : `${filtered.length} career${filtered.length !== 1 ? 's' : ''} found`}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ height: 300, borderRadius: 20, background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 8, color: '#1e1b4b' }}>No careers found</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <motion.div style={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {filtered.map((career, i) => (
              <motion.div key={career._id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={`/courses/${career.slug}`}>
                  <motion.div style={styles.card} whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(79,70,229,0.18)' }}>
                    {/* Category badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <span style={{ fontSize: '2.6rem' }}>{career.icon}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                        <span style={{ ...styles.badge, background: '#EEF2FF', color: '#4F46E5' }}>{career.category}</span>
                        <span style={{ ...styles.badge, background: career.demandLevel === 'High' ? '#dcfce7' : '#fef3c7', color: career.demandLevel === 'High' ? '#16a34a' : '#d97706' }}>
                          <FiTrendingUp size={10} /> {career.demandLevel} Demand
                        </span>
                      </div>
                    </div>

                    <h3 style={styles.cardTitle}>{career.title}</h3>
                    <p style={styles.cardDesc}>{career.description?.substring(0, 110)}...</p>

                    <div style={styles.cardMeta}>
                      <div style={styles.metaItem}><FiClock size={12} /> {career.duration}</div>
                      <div style={{ ...styles.metaItem, background: '#EEF2FF', color: '#4F46E5' }}>
                        ₹{career.salaryRange?.min}–{career.salaryRange?.max} LPA
                      </div>
                    </div>

                    <div style={styles.skillsRow}>
                      {career.skills?.slice(0, 3).map(s => (
                        <span key={s} style={styles.skillTag}>{s}</span>
                      ))}
                      {career.skills?.length > 3 && <span style={styles.skillTag}>+{career.skills.length - 3}</span>}
                    </div>

                    <div style={styles.viewBtn}>
                      View Full Roadmap <FiArrowRight size={14} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const styles = {
  controls: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 },
  searchWrap: { position: 'relative', maxWidth: 480 },
  searchIcon: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1rem' },
  searchInput: { width: '100%', padding: '12px 16px 12px 42px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: '0.95rem', background: 'white', outline: 'none', color: '#1e1b4b', transition: 'border-color 0.2s ease' },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  filterBtn: { padding: '7px 14px', borderRadius: 99, border: '1.5px solid #e2e8f0', background: 'white', fontSize: '0.82rem', fontWeight: 500, color: '#64748b', cursor: 'pointer', transition: 'all 0.2s ease' },
  filterBtnActive: { background: 'linear-gradient(135deg,#4F46E5,#9333EA)', borderColor: 'transparent', color: 'white', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 },
  card: { background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 20, padding: '26px 24px', transition: 'all 0.35s ease', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 },
  badge: { fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 3, letterSpacing: '0.04em' },
  cardTitle: { fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#1e1b4b', marginBottom: 10 },
  cardDesc: { color: '#64748b', fontSize: '0.87rem', lineHeight: 1.65, marginBottom: 16, flex: 1 },
  cardMeta: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  metaItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: '#f1f5f9', color: '#475569' },
  skillsRow: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 },
  skillTag: { fontSize: '0.72rem', padding: '3px 8px', borderRadius: 6, background: '#f8faff', border: '1px solid #e2e8f0', color: '#64748b', fontWeight: 500 },
  viewBtn: { display: 'flex', alignItems: 'center', gap: 6, color: '#4F46E5', fontWeight: 700, fontSize: '0.88rem', marginTop: 'auto' },
};
