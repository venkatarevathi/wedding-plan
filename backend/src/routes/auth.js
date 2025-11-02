const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', [
  body('fullname').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Create user
    const user = new User({ fullname, email, username, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
