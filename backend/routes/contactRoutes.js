// backend/routes/contactRoutes.js
const router = require('express').Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { body } = require('express-validator');

const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
];

router.post('/', contactValidation, submitContact);
router.get('/', getContacts);
module.exports = router;
