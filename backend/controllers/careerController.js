// backend/controllers/careerController.js
const Career = require('../models/Career');

// GET /api/careers
exports.getCareers = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const careers = await Career.find(filter)
      .select('title slug description icon category salaryRange demandLevel duration featured')
      .sort({ featured: -1, title: 1 });

    res.json({ success: true, count: careers.length, data: careers });
  } catch (err) {
    next(err);
  }
};

// GET /api/careers/:id
exports.getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findOne({
      $or: [{ slug: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });
    if (!career) return res.status(404).json({ success: false, message: 'Career not found' });
    res.json({ success: true, data: career });
  } catch (err) {
    next(err);
  }
};

// POST /api/careers
exports.createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (err) {
    next(err);
  }
};
