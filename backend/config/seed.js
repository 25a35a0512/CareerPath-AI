// backend/config/seed.js
// Run: node config/seed.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Career = require('../models/Career');

const careers = [
  {
    title: 'Full-Stack Web Developer',
    slug: 'full-stack-web-developer',
    description: 'Build complete web applications from front-end interfaces to back-end servers and databases. One of the most versatile and in-demand careers in tech.',
    icon: '💻',
    category: 'Technology',
    featured: true,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'REST APIs', 'SQL'],
    tools: ['VS Code', 'Postman', 'GitHub', 'Docker', 'AWS/Netlify', 'Figma'],
    roadmap: [
      { stage: 'Beginner', duration: '0–3 months', topics: ['HTML5 & CSS3', 'JavaScript basics', 'Git & GitHub', 'Responsive Design'] },
      { stage: 'Intermediate', duration: '3–8 months', topics: ['React.js', 'Node.js + Express', 'MongoDB', 'REST APIs', 'Authentication (JWT)'] },
      { stage: 'Advanced', duration: '8–14 months', topics: ['System Design', 'Docker + CI/CD', 'Cloud (AWS/GCP)', 'Testing', 'Performance Optimization'] },
    ],
    resources: [
      { title: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'course' },
      { title: 'freeCodeCamp', url: 'https://freecodecamp.org', type: 'course' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'article' },
    ],
    salaryRange: { min: 4, max: 25, currency: 'INR' },
    duration: '12–18 months to job-ready',
    demandLevel: 'High',
    futureScope: 'Exceptional. Web development is foundational to every digital business. With AI tools, developers who can architect and build systems will be highly valued.',
  },
  {
    title: 'Data Scientist',
    slug: 'data-scientist',
    description: 'Extract insights from complex data using statistical analysis, machine learning, and visualization. Drive business decisions with data.',
    icon: '📊',
    category: 'Technology',
    featured: true,
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'NumPy', 'Pandas', 'Scikit-learn'],
    tools: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Tableau', 'Power BI', 'Spark'],
    roadmap: [
      { stage: 'Beginner', duration: '0–3 months', topics: ['Python basics', 'Statistics & Probability', 'SQL', 'NumPy & Pandas'] },
      { stage: 'Intermediate', duration: '3–9 months', topics: ['Machine Learning (supervised/unsupervised)', 'Data Visualization', 'Feature Engineering', 'Scikit-learn'] },
      { stage: 'Advanced', duration: '9–18 months', topics: ['Deep Learning', 'NLP', 'MLOps', 'Big Data (Spark)', 'Model Deployment'] },
    ],
    resources: [
      { title: 'Kaggle Learn', url: 'https://kaggle.com/learn', type: 'course' },
      { title: 'Fast.ai', url: 'https://fast.ai', type: 'course' },
      { title: 'Towards Data Science (Medium)', url: 'https://towardsdatascience.com', type: 'article' },
    ],
    salaryRange: { min: 6, max: 35, currency: 'INR' },
    duration: '12–24 months to entry level',
    demandLevel: 'High',
    futureScope: 'Explosive growth. Every industry from healthcare to finance needs data scientists. AI/ML makes this field future-proof and highly lucrative.',
  },
  {
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    description: 'Design intuitive, beautiful user interfaces and seamless user experiences. Bridge the gap between user needs and business goals through design thinking.',
    icon: '🎨',
    category: 'Creative',
    featured: true,
    skills: ['Design Thinking', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'Figma', 'Adobe XD'],
    tools: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Miro', 'Maze'],
    roadmap: [
      { stage: 'Beginner', duration: '0–2 months', topics: ['Design Principles', 'Color Theory', 'Typography', 'Figma Basics'] },
      { stage: 'Intermediate', duration: '2–6 months', topics: ['User Research Methods', 'Wireframing & Prototyping', 'Usability Testing', 'Design Systems'] },
      { stage: 'Advanced', duration: '6–12 months', topics: ['Motion Design', 'Advanced Interactions', 'Design Leadership', 'Portfolio Building'] },
    ],
    resources: [
      { title: 'Google UX Design Certificate (Coursera)', url: 'https://coursera.org', type: 'course' },
      { title: 'Nielsen Norman Group Articles', url: 'https://nngroup.com/articles', type: 'article' },
      { title: 'Figma Learning', url: 'https://figma.com/resources/learn-design', type: 'video' },
    ],
    salaryRange: { min: 4, max: 22, currency: 'INR' },
    duration: '6–12 months to first job',
    demandLevel: 'High',
    futureScope: 'Strong. Every digital product needs UX designers. AR/VR and AI interfaces are creating new frontiers for design careers.',
  },
  {
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    description: 'Protect organizations from cyber threats by monitoring systems, analyzing vulnerabilities, and implementing security measures. A critical and fast-growing field.',
    icon: '🔐',
    category: 'Technology',
    featured: false,
    skills: ['Network Security', 'Ethical Hacking', 'Linux', 'Python', 'SIEM Tools', 'Cryptography', 'Incident Response'],
    tools: ['Wireshark', 'Metasploit', 'Kali Linux', 'Nmap', 'Burp Suite', 'Splunk'],
    roadmap: [
      { stage: 'Beginner', duration: '0–3 months', topics: ['Networking Basics (TCP/IP)', 'Linux fundamentals', 'CompTIA Security+ prep', 'Python basics'] },
      { stage: 'Intermediate', duration: '3–9 months', topics: ['Ethical Hacking (CEH/eJPT)', 'SIEM & Log Analysis', 'Vulnerability Assessment', 'Cloud Security'] },
      { stage: 'Advanced', duration: '9–18 months', topics: ['Penetration Testing (OSCP)', 'Malware Analysis', 'Threat Intelligence', 'SOC Operations'] },
    ],
    resources: [
      { title: 'TryHackMe', url: 'https://tryhackme.com', type: 'course' },
      { title: 'HackTheBox', url: 'https://hackthebox.com', type: 'course' },
      { title: 'SANS Institute', url: 'https://sans.org', type: 'course' },
    ],
    salaryRange: { min: 5, max: 30, currency: 'INR' },
    duration: '12–18 months to entry level',
    demandLevel: 'High',
    futureScope: 'Exceptional. Cyber threats are growing exponentially. Certified cybersecurity professionals are among the highest-paid in tech globally.',
  },
  {
    title: 'Product Manager',
    slug: 'product-manager',
    description: 'Lead the development of digital products from ideation to launch. Work at the intersection of technology, business, and user experience.',
    icon: '🚀',
    category: 'Business',
    featured: true,
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile/Scrum', 'Roadmapping', 'Communication', 'SQL basics'],
    tools: ['Jira', 'Confluence', 'Notion', 'Figma', 'Mixpanel', 'Google Analytics', 'Amplitude'],
    roadmap: [
      { stage: 'Beginner', duration: '0–3 months', topics: ['Product Thinking', 'Agile & Scrum', 'User Story Writing', 'Competitor Analysis'] },
      { stage: 'Intermediate', duration: '3–9 months', topics: ['Product Metrics & KPIs', 'A/B Testing', 'Roadmap Planning', 'Stakeholder Management'] },
      { stage: 'Advanced', duration: '9–18 months', topics: ['Growth Strategy', 'P&L Ownership', 'Team Leadership', 'Product-Led Growth'] },
    ],
    resources: [
      { title: 'Inspired by Marty Cagan (Book)', url: 'https://amazon.in', type: 'book' },
      { title: 'Product School', url: 'https://productschool.com', type: 'course' },
      { title: 'Lenny\'s Newsletter', url: 'https://lennysnewsletter.com', type: 'article' },
    ],
    salaryRange: { min: 8, max: 45, currency: 'INR' },
    duration: '2–4 years (usually from engineering or MBA)',
    demandLevel: 'High',
    futureScope: 'Very strong. Senior PMs and CPOs are among the most compensated roles in tech companies globally.',
  },
  {
    title: 'Digital Marketing Specialist',
    slug: 'digital-marketing-specialist',
    description: 'Drive online growth for businesses through SEO, social media, content marketing, paid ads, and analytics. A versatile career with entrepreneurial potential.',
    icon: '📱',
    category: 'Business',
    featured: false,
    skills: ['SEO/SEM', 'Google Ads', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Google Analytics', 'Copywriting'],
    tools: ['Google Analytics', 'Google Ads', 'Meta Ads Manager', 'SEMrush', 'HubSpot', 'Mailchimp', 'Canva'],
    roadmap: [
      { stage: 'Beginner', duration: '0–2 months', topics: ['Digital Marketing Fundamentals', 'SEO Basics', 'Social Media Strategy', 'Google Analytics'] },
      { stage: 'Intermediate', duration: '2–6 months', topics: ['Google Ads & Meta Ads', 'Email Marketing', 'Content Marketing', 'Conversion Optimization'] },
      { stage: 'Advanced', duration: '6–12 months', topics: ['Advanced Analytics', 'Marketing Automation', 'Performance Marketing', 'Brand Strategy'] },
    ],
    resources: [
      { title: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com', type: 'course' },
      { title: 'HubSpot Academy', url: 'https://academy.hubspot.com', type: 'course' },
      { title: 'Neil Patel Blog', url: 'https://neilpatel.com/blog', type: 'article' },
    ],
    salaryRange: { min: 3, max: 18, currency: 'INR' },
    duration: '6–12 months to first role',
    demandLevel: 'High',
    futureScope: 'Growing rapidly. AI tools are reshaping marketing, creating opportunities for specialists who can leverage data and automation.',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerpathdb');
    await Career.deleteMany({});
    const inserted = await Career.insertMany(careers);
    console.log(`✅ Seeded ${inserted.length} careers`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
