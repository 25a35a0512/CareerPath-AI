// backend/controllers/aiController.js
const OpenAI = require('openai');
const ChatHistory = require('../models/ChatHistory');

// Initialize OpenAI client (compatible with Groq, Together, etc.)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// System prompt for career guidance
const SYSTEM_PROMPT = `You are CareerPath AI, an expert career guidance counselor and mentor for students in India and globally.

Your expertise includes:
- Career path recommendations based on interests, skills, and education
- Skill gap analysis and learning roadmaps
- Course and certification recommendations
- Salary ranges and job market insights
- College and university guidance
- Interview preparation tips
- Resume and portfolio advice

Communication style:
- Be warm, encouraging, and professional
- Give specific, actionable advice
- Use bullet points and structured responses when helpful
- Mention real resources (Coursera, edX, YouTube, LinkedIn Learning, etc.)
- Always encourage the student

When recommending careers or doing salary analysis:
- Provide salary ranges in both INR (LPA) and USD where relevant
- Mention top companies hiring in that field
- Give realistic timelines for skill development
- Suggest both online and offline learning paths

Keep responses concise but comprehensive. Always end with an encouraging note or a follow-up question to continue the conversation.`;

// POST /api/ai/chat
exports.chat = async (req, res, next) => {
  try {
    const { message, sessionId, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Build messages array (last 10 turns for context window management)
    const recentHistory = history.slice(-10);
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentHistory.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message.trim() },
    ];

    // Call LLM API
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 800,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.';

    // Save to chat history if sessionId provided
    if (sessionId) {
      await ChatHistory.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            messages: [
              { role: 'user', content: message.trim() },
              { role: 'assistant', content: aiResponse },
            ],
          },
          $inc: { 'metadata.totalMessages': 2 },
          $set: { 'metadata.lastActive': new Date() },
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      data: {
        message: aiResponse,
        model: MODEL,
        usage: completion.usage,
      },
    });
  } catch (err) {
    // Handle OpenAI API errors specifically
    if (err?.status === 401) {
      return res.status(401).json({ success: false, message: 'Invalid API key. Please check your OpenAI API key.' });
    }
    if (err?.status === 429) {
      return res.status(429).json({ success: false, message: 'AI service is busy. Please try again in a moment.' });
    }
    next(err);
  }
};

// GET /api/ai/history/:sessionId
exports.getHistory = async (req, res, next) => {
  try {
    const history = await ChatHistory.findOne({ sessionId: req.params.sessionId });
    res.json({ success: true, data: history?.messages || [] });
  } catch (err) {
    next(err);
  }
};

// POST /api/ai/career-recommendation
exports.careerRecommendation = async (req, res, next) => {
  try {
    const { interests, skills, education, experience } = req.body;

    const prompt = `Based on the following student profile, provide 3-5 specific career recommendations with brief explanations:

Education: ${education || 'Not specified'}
Interests: ${interests || 'Not specified'}
Current Skills: ${skills || 'Not specified'}
Experience: ${experience || 'Fresher'}

For each career recommendation, provide:
1. Career title
2. Why it suits this profile
3. Key skills to develop
4. Estimated salary range (INR LPA)
5. Time to get entry-level job

Format as a structured, encouraging response.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      success: true,
      data: { recommendations: completion.choices[0]?.message?.content },
    });
  } catch (err) {
    next(err);
  }
};
