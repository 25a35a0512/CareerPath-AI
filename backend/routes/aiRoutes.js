// backend/routes/aiRoutes.js
const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { chat, getHistory, careerRecommendation } = require('../controllers/aiController');

// Rate limit: 20 messages per minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests. Please wait a moment before sending another message.' },
});

router.post('/chat', aiLimiter, chat);
router.get('/history/:sessionId', getHistory);
router.post('/career-recommendation', aiLimiter, careerRecommendation);
module.exports = router;
