// src/pages/Contact.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { submitContact } from '../services/api';

const CAREERS_LIST = ['Full-Stack Development', 'Data Science', 'UI/UX Design', 'Cybersecurity', 'Product Management', 'Digital Marketing', 'MBA', 'UPSC/Government Exams', 'Other'];

const initialForm = { name: '', email: '', phone: '', interestedCareer: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setServerError('');
    try {
      await submitContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Failed to send message. Please try again.');
    }
  };

  const INFO_CARDS = [
    { icon: <FiMail />, label: 'Email', value: 'hello@careerpath.ai', sub: 'We reply within 24 hours' },
    { icon: <FiPhone />, label: 'Phone', value: '+91 800-123-4567', sub: 'Mon–Sat, 9AM–7PM IST' },
    { icon: <FiMapPin />, label: 'Office', value: 'New Delhi, India', sub: 'Connaught Place, 110001' },
    { icon: <FiClock />, label: 'Response Time', value: 'Within 24 Hours', sub: 'On working days' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}>Get In Touch</span>
            <h1>Contact Us</h1>
            <p>Our career experts are ready to guide you toward the right path</p>
          </motion.div>
        </div>
      </div>

      <section style={{ padding: '64px 0', background: '#f8faff' }}>
        <div className="container">
          <div style={styles.layout}>

            {/* Left: Info */}
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <span className="section-label">Talk to Us</span>
                <h2 style={styles.infoTitle}>Let's Discuss Your Career Goals</h2>
                <p style={styles.infoDesc}>Fill out the form and our expert counselors will reach out within 24 hours. No commitment required — first consultation is free.</p>
              </motion.div>

              <motion.div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 32 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                {INFO_CARDS.map(c => (
                  <div key={c.label} style={styles.infoCard}>
                    <div style={styles.infoIcon}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.92rem' }}>{c.value}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div style={styles.proofCard} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div style={{ fontSize: '1.8rem' }}>⭐</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>Trusted by 10,000+ Students</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>4.9/5 average rating across all our services</div>
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div style={styles.formCard} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h3 style={styles.formTitle}>Send Us a Message 📋</h3>

              {/* Success state */}
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.successBox}>
                    <motion.div style={styles.successIcon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                      <FiCheck size={24} />
                    </motion.div>
                    <h4 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, marginBottom: 6 }}>Message Sent!</h4>
                    <p style={{ color: '#166534', fontSize: '0.9rem' }}>Our team will contact you within 24 hours. Check your email for confirmation.</p>
                    <button onClick={() => setStatus('idle')} style={{ marginTop: 16, padding: '8px 16px', borderRadius: 8, background: '#16a34a', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate>
                    {/* Server error */}
                    {status === 'error' && (
                      <div style={styles.errorBar}>{serverError}</div>
                    )}

                    <div style={styles.formRow}>
                      <Field label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} error={errors.name} placeholder="Arjun Sharma" required />
                      <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="arjun@gmail.com" required />
                    </div>

                    <div style={styles.formRow}>
                      <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                      <div style={{ flex: 1 }}>
                        <label style={styles.label}>Interested Career</label>
                        <select name="interestedCareer" value={form.interestedCareer} onChange={handleChange} style={styles.select}>
                          <option value="">-- Select Career --</option>
                          {CAREERS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={styles.label}>Your Message / Query <span style={{ color: '#ef4444' }}>*</span></label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your career goals or questions..."
                        style={{ ...styles.input, resize: 'vertical', minHeight: 110, borderColor: errors.message ? '#ef4444' : '#e2e8f0' }}
                      />
                      {errors.message && <p style={styles.errorText}>{errors.message}</p>}
                    </div>

                    <motion.button type="submit" disabled={status === 'loading'} style={{ ...styles.submitBtn, opacity: status === 'loading' ? 0.7 : 1 }} whileHover={status !== 'loading' ? { scale: 1.02 } : {}} whileTap={status !== 'loading' ? { scale: 0.98 } : {}}>
                      {status === 'loading' ? (
                        <><span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                      ) : (
                        <><FiSend size={15} /> Send Message</>
                      )}
                    </motion.button>

                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: 12 }}>
                      🔒 Your information is secure and never shared with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Reusable Field component
function Field({ label, name, type, value, onChange, error, placeholder, required }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={styles.label}>{label} {required && <span style={{ color: '#ef4444' }}>*</span>}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={{ ...styles.input, borderColor: error ? '#ef4444' : '#e2e8f0' }} />
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' },
  infoTitle: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', color: '#1e1b4b', marginBottom: 12 },
  infoDesc: { color: '#64748b', fontSize: '0.95rem', lineHeight: 1.75 },
  infoCard: { background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '16px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' },
  infoIcon: { width: 36, height: 36, borderRadius: 10, background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  proofCard: { display: 'flex', alignItems: 'center', gap: 14, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, padding: '16px 18px', marginTop: 20 },
  formCard: { background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 22, padding: '36px 32px', boxShadow: '0 8px 40px rgba(79,70,229,0.08)' },
  formTitle: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#1e1b4b', marginBottom: 24 },
  formRow: { display: 'flex', gap: 16, marginBottom: 16 },
  label: { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: 6, letterSpacing: '0.02em' },
  input: { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: '0.92rem', color: '#1e1b4b', outline: 'none', fontFamily: "'Satoshi',sans-serif", transition: 'border-color 0.2s ease', background: 'white', marginBottom: 0 },
  select: { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: '0.92rem', color: '#1e1b4b', outline: 'none', fontFamily: "'Satoshi',sans-serif", background: 'white', cursor: 'pointer' },
  errorText: { fontSize: '0.78rem', color: '#ef4444', marginTop: 4 },
  errorBar: { background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontSize: '0.88rem', color: '#dc2626', marginBottom: 16 },
  submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', color: 'white', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: "'Cabinet Grotesk',sans-serif", boxShadow: '0 4px 20px rgba(79,70,229,0.3)', marginTop: 16 },
  successBox: { background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 16, padding: '32px', textAlign: 'center' },
  successIcon: { width: 56, height: 56, borderRadius: '50%', background: '#16a34a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
};
