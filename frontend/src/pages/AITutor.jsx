// src/pages/AITutor.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiZap, FiTrash2, FiUser, FiRefreshCw, FiTarget, FiTrendingUp, FiBook } from 'react-icons/fi';
import { sendAIMessage } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

// Suggestion chips for quick prompts
const SUGGESTIONS = [
  { icon: '🎯', text: 'Recommend a career based on my interests' },
  { icon: '📊', text: 'Analyze my skill gaps for Data Science' },
  { icon: '🛣️', text: 'Create a roadmap to become a Full-Stack Developer' },
  { icon: '💰', text: 'What salary can I expect as a UI/UX Designer?' },
  { icon: '🎓', text: 'Best courses after 12th for Commerce students' },
  { icon: '🤖', text: 'How to get started with Artificial Intelligence?' },
];

// Typing indicator component
const TypingDots = () => (
  <div style={{ display: 'flex', gap: 5, padding: '8px 12px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        style={{ width: 7, height: 7, borderRadius: '50%', background: '#9333EA' }}
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, delay: i * 0.18, repeat: Infinity }}
      />
    ))}
  </div>
);

// Format AI message with basic markdown-like rendering
const FormattedMessage = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div style={{ fontSize: '0.92rem', lineHeight: 1.75 }}>
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={i} style={{ color: '#1e1b4b', display: 'block', marginTop: i > 0 ? 8 : 0 }}>{line.replace(/\*\*/g, '')}</strong>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <div key={i} style={{ paddingLeft: 16, position: 'relative', marginTop: 4 }}>
            <span style={{ position: 'absolute', left: 0, color: '#7C3AED' }}>•</span>
            {line.replace(/^[•-] /, '')}
          </div>;
        }
        if (line.match(/^\d+\./)) {
          return <div key={i} style={{ paddingLeft: 20, position: 'relative', marginTop: 6 }}>
            <span style={{ position: 'absolute', left: 0, color: '#4F46E5', fontWeight: 700 }}>{line.match(/^\d+/)[0]}.</span>
            {line.replace(/^\d+\. /, '')}
          </div>;
        }
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} style={{ margin: '4px 0' }}>{line}</p>;
      })}
    </div>
  );
};

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm your AI Career Tutor powered by advanced AI.\n\nI can help you:\n• Discover the **perfect career** based on your interests\n• Analyze **skill gaps** and build your roadmap\n• Get **salary insights** for different careers\n• Answer all career-related questions instantly\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput('');
    setError(null);

    const userMsg = { id: Date.now(), role: 'user', content: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build history array (exclude welcome message)
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await sendAIMessage({ message: trimmed, sessionId, history });
      const aiContent = res.data.data.message;

      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiContent, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setError(err.message || 'Failed to get AI response. Please try again.');
      // Remove user message if API failed
      setMessages(prev => prev.filter(m => m.id !== userMsg.id));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat cleared! I'm ready to help. What career question can I answer for you?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  const formatTime = (date) => new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%,rgba(79,70,229,0.35) 0%,transparent 60%),radial-gradient(ellipse at 70% 50%,rgba(6,182,212,0.2) 0%,transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <motion.div style={styles.aiBotIcon} animate={{ boxShadow: ['0 0 20px rgba(79,70,229,0.3)', '0 0 40px rgba(147,51,234,0.5)', '0 0 20px rgba(79,70,229,0.3)'] }} transition={{ duration: 3, repeat: Infinity }}>
                  🤖
                </motion.div>
                <div>
                  <h1 style={{ color: 'white', fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 2 }}>AI Career Tutor</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
                    Online · Powered by Advanced AI
                  </div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>Ask anything about careers, skills, roadmaps, or salaries.</p>
            </div>

            {/* Feature chips */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: <FiTarget size={13} />, label: 'Career Rec.' },
                { icon: <FiTrendingUp size={13} />, label: 'Skill Analysis' },
                { icon: <FiBook size={13} />, label: 'Roadmaps' },
              ].map(f => (
                <div key={f.label} style={styles.featureChip}>
                  {f.icon} {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="container" style={{ padding: '32px 24px', maxWidth: 900 }}>
        <div style={styles.chatCard}>
          {/* Chat toolbar */}
          <div style={styles.toolbar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>CareerPath AI · Always Available</span>
            </div>
            <motion.button onClick={clearChat} style={styles.clearBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} title="Clear chat">
              <FiTrash2 size={14} /> Clear
            </motion.button>
          </div>

          {/* Messages area */}
          <div style={styles.messagesArea}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-end' }}
                >
                  {/* Avatar */}
                  <div style={{ ...styles.avatar, background: msg.role === 'user' ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'linear-gradient(135deg,#0F0F1A,#1A1A2E)', flexShrink: 0 }}>
                    {msg.role === 'user' ? <FiUser size={14} /> : '🤖'}
                  </div>

                  {/* Bubble */}
                  <div style={{ maxWidth: '80%' }}>
                    <div style={{ ...styles.bubble, ...(msg.role === 'user' ? styles.userBubble : styles.aiBubble) }}>
                      {msg.role === 'assistant' ? <FormattedMessage content={msg.content} /> : <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.65 }}>{msg.content}</p>}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                  <div style={{ ...styles.avatar, background: 'linear-gradient(135deg,#0F0F1A,#1A1A2E)', flexShrink: 0 }}>🤖</div>
                  <div style={{ ...styles.bubble, ...styles.aiBubble }}><TypingDots /></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.errorBar}>
                  ⚠️ {error}
                  <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 700, marginLeft: 8 }}>✕</button>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips (only when first) */}
          {messages.length <= 1 && (
            <div style={styles.suggestions}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>Quick Prompts</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SUGGESTIONS.map((s) => (
                  <motion.button key={s.text} onClick={() => sendMessage(s.text)} style={styles.chipBtn} whileHover={{ scale: 1.03, borderColor: '#4F46E5', color: '#4F46E5' }} whileTap={{ scale: 0.97 }}>
                    {s.icon} {s.text}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div style={styles.inputArea}>
            <div style={styles.inputWrap}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask about careers, skills, roadmaps, salaries..."
                style={styles.textarea}
                rows={1}
                disabled={loading}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{ ...styles.sendBtn, opacity: !input.trim() || loading ? 0.5 : 1 }}
                whileHover={!input.trim() || loading ? {} : { scale: 1.1 }}
                whileTap={!input.trim() || loading ? {} : { scale: 0.9 }}
              >
                {loading ? <FiRefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <FiSend size={16} />}
              </motion.button>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 6, textAlign: 'center' }}>
              Press <kbd style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 5px', fontSize: '0.7rem' }}>Enter</kbd> to send · <kbd style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 5px', fontSize: '0.7rem' }}>Shift+Enter</kbd> for new line
            </div>
          </div>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8faff' },
  header: { background: 'linear-gradient(135deg,#0F0F1A 0%,#1A1A2E 100%)', padding: '100px 0 40px', position: 'relative', overflow: 'hidden' },
  aiBotIcon: { width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 8px 24px rgba(79,70,229,0.4)' },
  featureChip: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', fontWeight: 600, backdropFilter: 'blur(8px)' },
  chatCard: { background: 'white', borderRadius: 24, border: '1.5px solid #e2e8f0', boxShadow: '0 8px 40px rgba(79,70,229,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafbff' },
  clearBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontWeight: 600, fontSize: '0.8rem', border: 'none', cursor: 'pointer' },
  messagesArea: { flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20, minHeight: 420, maxHeight: 520, overflowY: 'auto' },
  avatar: { width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem', flexShrink: 0 },
  bubble: { borderRadius: 16, padding: '12px 16px', maxWidth: '100%' },
  userBubble: { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', color: 'white', borderBottomRightRadius: 4 },
  aiBubble: { background: '#f8faff', border: '1px solid #e2e8f0', color: '#1e1b4b', borderBottomLeftRadius: 4 },
  errorBar: { display: 'flex', alignItems: 'center', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontSize: '0.85rem', color: '#dc2626' },
  suggestions: { padding: '12px 20px', borderTop: '1px solid #f1f5f9' },
  chipBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white', fontSize: '0.8rem', color: '#475569', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease', fontFamily: 'inherit' },
  inputArea: { padding: '16px 20px', borderTop: '1px solid #e2e8f0', background: '#fafbff' },
  inputWrap: { display: 'flex', gap: 10, alignItems: 'flex-end' },
  textarea: { flex: 1, padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'white', fontSize: '0.92rem', color: '#1e1b4b', resize: 'none', outline: 'none', fontFamily: "'Satoshi',sans-serif", lineHeight: 1.6, transition: 'border-color 0.2s', maxHeight: 120, overflowY: 'auto' },
  sendBtn: { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#4F46E5,#9333EA)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79,70,229,0.35)' },
};
