const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const router = express.Router();

router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('number').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, number, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      number,
      subject,
      message
    });

    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully! We will get back to you soon.',
      id: contact._id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
