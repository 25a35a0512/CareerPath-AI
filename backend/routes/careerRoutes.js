// backend/routes/careerRoutes.js
const router = require('express').Router();
const { getCareers, getCareerById, createCareer } = require('../controllers/careerController');
router.get('/', getCareers);
router.get('/:id', getCareerById);
router.post('/', createCareer);
module.exports = router;
