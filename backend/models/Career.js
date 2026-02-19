// backend/models/Career.js
const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    icon: { type: String, default: '💼' },
    category: {
      type: String,
      enum: ['Technology', 'Business', 'Healthcare', 'Creative', 'Science', 'Education', 'Finance'],
      default: 'Technology',
    },
    skills: [{ type: String }],
    tools: [{ type: String }],
    roadmap: [
      {
        stage: String,      // e.g., "Beginner"
        duration: String,   // e.g., "0-6 months"
        topics: [String],
      },
    ],
    resources: [
      {
        title: String,
        url: String,
        type: { type: String, enum: ['course', 'book', 'video', 'article'] },
      },
    ],
    salaryRange: {
      min: Number,  // in LPA (India)
      max: Number,
      currency: { type: String, default: 'INR' },
    },
    duration: { type: String },   // e.g., "6-12 months to entry level"
    demandLevel: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
    futureScope: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
