// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Careers ─────────────────────────────────────────────────────────────
export const getCareers = (params = {}) => api.get('/careers', { params });
export const getCareerBySlug = (slug) => api.get(`/careers/${slug}`);
export const createCareer = (data) => api.post('/careers', data);

// ─── Contact ──────────────────────────────────────────────────────────────
export const submitContact = (data) => api.post('/contact', data);

// ─── AI ───────────────────────────────────────────────────────────────────
export const sendAIMessage = (data) => api.post('/ai/chat', data);
export const getAICareerRecommendation = (data) => api.post('/ai/career-recommendation', data);
export const getAIHistory = (sessionId) => api.get(`/ai/history/${sessionId}`);

export default api;
