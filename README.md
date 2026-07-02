🚀 CareerPath AI — Full-Stack MERN EdTech Platform

An AI-powered career guidance platform that helps students explore careers, get personalized roadmaps, and chat with an AI tutor — built end-to-end with React, Node.js, Express, and MongoDB.

✨ Why I Built This
Most career guidance platforms in India are static and generic. CareerPath AI gives students a searchable, filterable career catalog with detailed roadmaps, salary ranges, and demand levels — plus a real-time AI tutor (OpenAI/Groq-compatible) that answers career questions conversationally instead of pointing to a PDF.

⭐ Features

🔍 Browse & filter careers by category (Tech, Business, Creative, Science, Finance, Healthcare, Education)
🗺️ Detailed career roadmaps — stages, duration, topics, curated resources per career
🤖 AI Tutor — real-time chat powered by OpenAI/Groq/Together AI with rate-limited API and persistent chat history
💰 Salary & demand insights per career (min/max range, demand level, future scope)
📬 Contact/lead capture with server-side validation, stored in MongoDB
🔒 Production-grade security — Helmet, CORS, rate limiting, input validation, centralized error handling
📱 Fully responsive UI with glassmorphism navbar and Framer Motion transitions

🧰 Tech Stack

LayerTechnologyFrontendReact 18 + React Router v6AnimationsFramer MotionIconsReact IconsHTTP ClientAxiosBackendNode.js + Express 4DatabaseMongoDB + MongooseAIOpenAI SDK (compatible with Groq, Together AI)SecurityHelmet + CORS + Rate Limit + express-validatorDev ToolsNodemon + Create React App

⚡ Quick Start

Prerequisites
Node.js v16+
MongoDB (local or Atlas)
OpenAI API Key (or Groq/Together AI key)

1 — Backend

bashcd backend
npm install
cp .env.example .env   # fill in your values

envPORT=5000
MONGODB_URI=mongodb://localhost:27017/careerpathdb
OPENAI_API_KEY=sk-your-openai-key-here
CLIENT_URL=http://localhost:3000
NODE_ENV=development

2 — Seed the Database

bashcd backend
node config/seed.js
# ✅ Seeded 6 careers

3 — Start Backend

bashnpm run dev        # development (nodemon)
# or
npm start           # production

Runs at http://localhost:5000

4 — Frontend

bashcd frontend
npm install

envREACT_APP_API_URL=http://localhost:5000/api

5 — Start Frontend

bashnpm start

Runs at http://localhost:3000

🔑 Using Alternative AI Providers

The backend works with any OpenAI-compatible API.

Groq (free, fast):

envOPENAI_API_KEY=gsk_your-groq-api-key
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.1-70b-versatile

Together AI:

envOPENAI_API_KEY=your-together-key
OPENAI_BASE_URL=https://api.together.xyz/v1
OPENAI_MODEL=meta-llama/Llama-3-70b-chat-hf

Free Groq key: https://console.groq.com

📡 API Endpoints

MethodEndpointDescriptionGET/api/healthServer health checkGET/api/careersGet all careers (filter: category, featured)GET/api/careers/:slugGet career by slugPOST/api/careersCreate new careerPOST/api/contactSubmit contact form → MongoDBGET/api/contactGet all contact submissionsPOST/api/ai/chatAI chat (rate-limited: 20/min)POST/api/ai/career-recommendationGet AI career recommendationsGET/api/ai/history/:sessionIdGet chat history

🗄️ Database Schemas

Career — title, slug, description, category, skills, tools, roadmap, resources, salaryRange, demandLevel, futureScope, featured

Contact — name, email, phone, interestedCareer, message, status

ChatHistory — sessionId, messages[], metadata

📁 Project Structure

careerpath-ai/
├── frontend/          React app (components, pages, services)
├── backend/           Express API (config, models, controllers, routes, middleware)
└── README.md

(Full tree in /docs/structure.md — kept out of the main README to keep it skimmable)

🚀 Deployment

Backend (Railway / Render / Heroku) — set MONGODB_URI, OPENAI_API_KEY, CLIENT_URL, NODE_ENV=production

Frontend (Netlify / Vercel):

bashcd frontend
npm run build
# deploy the 'build' folder, set REACT_APP_API_URL to your backend URL

🔮 Roadmap
 JWT authentication (student profiles)
 Admin dashboard to manage careers
 AI career recommendation quiz
 Saved/bookmarked careers
 AI resume builder
 Analytics dashboard

📄 License

This project is licensed under the MIT License — see LICENSE for details.

👤 Author
Madhava Bobbili
MERN Stack Developer | B.Tech CSE, Pragati Engineering College

LinkedIn: linkedin.com/in/madhava-bobbili
GitHub: @25a35a0512
LeetCode: 25a35a0512

Built with ❤️ for students exploring their career paths.
