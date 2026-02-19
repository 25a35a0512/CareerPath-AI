// backend/controllers/contactController.js
const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// POST /api/contact
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message received! Our team will contact you within 24 hours.',
      data: { id: contact._id, name: contact.name, createdAt: contact.createdAt },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    next(err);
  }
};
