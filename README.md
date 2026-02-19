# 🚀 CareerPath AI — Full-Stack MERN EdTech Platform

> AI-powered career guidance platform built with React.js, Node.js, Express, MongoDB, and OpenAI API.

---

## 📁 Complete Folder Structure

```
careerpath-ai/
│
├── frontend/                          # React.js Application
│   ├── public/
│   │   └── index.html                 # HTML entry with Google Fonts
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Sticky navbar with glassmorphism + hamburger
│   │   │   └── Footer.jsx             # Full footer with links and social icons
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Hero + Categories + Featured Careers + CTA
│   │   │   ├── Courses.jsx            # Career listing with search + category filter
│   │   │   ├── CareerDetail.jsx       # Full career detail with tabs + sidebar
│   │   │   ├── Services.jsx           # 5 service cards + AI tutor CTA
│   │   │   ├── Contact.jsx            # Contact form → MongoDB via API
│   │   │   └── AITutor.jsx            # Real-time AI chat with OpenAI integration
│   │   ├── services/
│   │   │   └── api.js                 # Axios API service layer
│   │   ├── App.js                     # Router + page transitions + scroll-to-top
│   │   ├── index.js                   # React DOM entry
│   │   └── index.css                  # Global CSS + design tokens + utilities
│   ├── package.json
│   └── .env                           # REACT_APP_API_URL
│
├── backend/                           # Node.js + Express API
│   ├── config/
│   │   ├── db.js                      # MongoDB Mongoose connection
│   │   └── seed.js                    # Database seeder (6 career records)
│   ├── models/
│   │   ├── Career.js                  # Career Mongoose schema
│   │   ├── Contact.js                 # Contact form Mongoose schema
│   │   └── ChatHistory.js             # Chat session history schema
│   ├── controllers/
│   │   ├── careerController.js        # GET, POST careers
│   │   ├── contactController.js       # Submit + retrieve contacts
│   │   └── aiController.js            # OpenAI chat + recommendations
│   ├── routes/
│   │   ├── careerRoutes.js            # /api/careers
│   │   ├── contactRoutes.js           # /api/contact (with validation)
│   │   └── aiRoutes.js                # /api/ai (with rate limiting)
│   ├── middleware/
│   │   └── errorHandler.js            # Centralized error handling
│   ├── server.js                      # Express server entry point
│   ├── package.json
│   └── .env.example                   # Environment variable template
│
└── README.md
```

---

## ⚡ Quick Start (5 Steps)

### Prerequisites
- **Node.js** v16+
- **MongoDB** (local or Atlas)
- **OpenAI API Key** (or Groq/Together AI key)

---

### Step 1 — Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit with your values
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerpathdb
OPENAI_API_KEY=sk-your-openai-key-here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Step 2 — Seed the Database

```bash
cd backend
node config/seed.js
# ✅ Seeded 6 careers
```

### Step 3 — Start Backend

```bash
npm run dev        # Development (nodemon)
# OR
npm start          # Production
```

Backend runs at: `http://localhost:5000`

---

### Step 4 — Setup Frontend

```bash
cd frontend
npm install
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5 — Start Frontend

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔑 Using Alternative AI Providers

The backend supports any OpenAI-compatible API. To use **Groq** (free, fast):

```env
OPENAI_API_KEY=gsk_your-groq-api-key
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=llama-3.1-70b-versatile
```

To use **Together AI**:
```env
OPENAI_API_KEY=your-together-key
OPENAI_BASE_URL=https://api.together.xyz/v1
OPENAI_MODEL=meta-llama/Llama-3-70b-chat-hf
```

Get free Groq key: https://console.groq.com

---

## 📡 API Endpoints

| Method | Endpoint                     | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | /api/health                 | Server health check                |
| GET    | /api/careers                | Get all careers (filter: category, featured) |
| GET    | /api/careers/:slug          | Get career by slug                 |
| POST   | /api/careers                | Create new career                  |
| POST   | /api/contact                | Submit contact form → MongoDB      |
| GET    | /api/contact                | Get all contact submissions        |
| POST   | /api/ai/chat                | AI chat (rate-limited: 20/min)     |
| POST   | /api/ai/career-recommendation | Get AI career recommendations    |
| GET    | /api/ai/history/:sessionId  | Get chat history                   |

---

## 🗄️ Database Schemas

### Career Schema
```javascript
{
  title: String (required),
  slug: String (unique),
  description: String,
  icon: String (emoji),
  category: Enum['Technology','Business','Creative','Science','Finance','Healthcare','Education'],
  skills: [String],
  tools: [String],
  roadmap: [{ stage, duration, topics[] }],
  resources: [{ title, url, type }],
  salaryRange: { min, max, currency },
  duration: String,
  demandLevel: Enum['High','Medium','Low'],
  futureScope: String,
  featured: Boolean,
  createdAt, updatedAt (auto)
}
```

### Contact Schema
```javascript
{
  name: String (required, 2-100 chars),
  email: String (required, valid email),
  phone: String,
  interestedCareer: String,
  message: String (required, 10-2000 chars),
  status: Enum['new','read','replied'],
  createdAt, updatedAt (auto)
}
```

### ChatHistory Schema
```javascript
{
  sessionId: String (indexed),
  messages: [{ role: 'user'|'assistant', content, timestamp }],
  metadata: { totalMessages, lastActive },
  createdAt, updatedAt (auto)
}
```

---

## 🎨 UI Features

| Feature | Implementation |
|---------|----------------|
| Typography | Cabinet Grotesk (display) + Satoshi (body) |
| Theme | Indigo + Purple + Cyan gradient palette |
| Animations | Framer Motion page transitions + hover effects |
| Glassmorphism | Navbar on scroll with backdrop-filter |
| Chat UI | Bubble interface, typing dots, auto-scroll |
| Responsiveness | Mobile-first, CSS Grid + Flexbox |
| Color tokens | CSS custom properties (`:root` variables) |

---

## 🔒 Security Features

- **Helmet.js** — Sets security HTTP headers
- **CORS** — Configured for specific frontend origin
- **Rate Limiting** — 200 req/15min general; 20 req/min for AI routes
- **Input Validation** — express-validator on contact routes
- **Environment Variables** — All secrets in `.env`
- **Error Handling** — Centralized middleware, no stack traces in production

---

## 🚀 Deployment

### Backend (Railway / Render / Heroku)
```bash
# Set environment variables in your hosting dashboard
PORT=5000
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
CLIENT_URL=https://your-frontend.netlify.app
NODE_ENV=production
```

### Frontend (Netlify / Vercel)
```bash
cd frontend
npm run build
# Deploy the 'build' folder
# Set REACT_APP_API_URL=https://your-backend.railway.app/api
```

### Netlify Redirect Fix (SPA)
Create `frontend/public/_redirects`:
```
/*    /index.html   200
```

---

## 📦 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + React Router v6 |
| Animations | Framer Motion |
| Icons | React Icons |
| HTTP Client | Axios |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| AI | OpenAI SDK (compatible with Groq, Together) |
| Security | Helmet + CORS + Rate Limit + express-validator |
| Dev | Nodemon + CRA |

---

## 🔮 Future Roadmap

- [ ] JWT Authentication (student profiles)
- [ ] Admin dashboard to manage careers
- [ ] AI Career Recommendation Quiz
- [ ] Saved/bookmarked careers
- [ ] Resume builder with AI
- [ ] Blog/articles system
- [ ] Analytics dashboard
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

*Built with ❤️ for students — CareerPath AI Team*
"# Carrer-ai" 
