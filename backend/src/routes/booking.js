const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', [
  body('groom').trim().isLength({ min: 2 }).withMessage('Groom name is required'),
  body('bride').trim().isLength({ min: 2 }).withMessage('Bride name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  body('venue').isIn(['church', 'garden', 'banquet', 'beach']).withMessage('Valid venue selection is required'),
  body('package').isIn(['basic', 'premium', 'luxury']).withMessage('Valid package selection is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      groom, bride, email, phone, date, time, guests, venue, package: selectedPackage,
      services = [], paymentMethod = 'pending', eventDetails = {}, servicesDetails = {}
    } = req.body;

    const booking = new Booking({
      groom,
      bride,
      email,
      phone,
      date: new Date(date),
      time,
      guests: parseInt(guests),
      venue,
      package: selectedPackage,
      services,
      paymentMethod,
      eventDetails: {
        theme: eventDetails.theme || 'Traditional',
        decorStyle: eventDetails.decorStyle || 'Classic',
        ceremonyType: eventDetails.ceremonyType || 'Traditional',
        specialRequirements: eventDetails.specialRequirements
      },
      servicesDetails: {
        catering: services.includes('catering') ? {
          menuType: servicesDetails.catering?.menuType || 'mixed',
          servingStyle: servicesDetails.catering?.servingStyle || 'buffet',
          specialDietRequirements: servicesDetails.catering?.specialDietRequirements
        } : undefined,
        photography: services.includes('photography') ? {
          coverageHours: servicesDetails.photography?.coverageHours || 8,
          includeVideography: servicesDetails.photography?.includeVideography ?? true,
          specialShoots: servicesDetails.photography?.specialShoots || []
        } : undefined,
        music: services.includes('music') ? {
          type: servicesDetails.music?.type || 'dj',
          duration: servicesDetails.music?.duration || 6
        } : undefined,
        decor: services.includes('decor') ? {
          style: servicesDetails.decor?.style || 'traditional',
          colorScheme: servicesDetails.decor?.colorScheme,
          specialDecorations: servicesDetails.decor?.specialDecorations || []
        } : undefined
      }
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking details saved successfully!',
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId,
        groom: booking.groom,
        bride: booking.bride,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        venue: booking.venue,
        guests: booking.guests,
        package: booking.package,
        services: booking.services,
        eventDetails: booking.eventDetails,
        servicesDetails: booking.servicesDetails,
        status: booking.status,
        transactionId: booking.transactionId,
        paymentMethod: booking.paymentMethod,
        totalAmount: booking.totalAmount
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bookings (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.user.email })
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Complete booking with payment
router.put('/:id/complete', async (req, res) => {
  try {
    const { paymentMethod, status, paymentDetails } = req.body;

    // Find booking by ID
    const booking = await Booking.findOne({ _id: req.params.id });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update booking with payment info
    booking.paymentMethod = paymentMethod;
    booking.status = status;
    booking.transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Save payment details to the database
    await booking.save();

    res.json({
      message: 'Payment completed successfully!',
      booking: {
        bookingId: booking.bookingId,
        groom: booking.groom,
        bride: booking.bride,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        venue: booking.venue,
        guests: booking.guests,
        package: booking.package,
        services: booking.services,
        eventDetails: booking.eventDetails,
        servicesDetails: booking.servicesDetails,
        status: booking.status,
        transactionId: booking.transactionId,
        paymentMethod: booking.paymentMethod,
        totalAmount: booking.totalAmount
      }
    });
  } catch (error) {
    console.error('Payment completion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
