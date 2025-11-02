const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: function () {
      return `WED-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }
  },
  groom: {
    type: String,
    required: [true, 'Groom name is required'],
    trim: true
  },
  bride: {
    type: String,
    required: [true, 'Bride name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [10, 'Phone number must be at least 10 digits']
  },
  date: {
    type: Date,
    required: [true, 'Wedding date is required']
  },
  time: {
    type: String,
    required: [true, 'Wedding time is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest is required']
  },
  venue: {
    type: String,
    required: [true, 'Venue selection is required'],
    enum: ['church', 'garden', 'banquet', 'beach']
  },
  package: {
    type: String,
    required: [true, 'Package selection is required'],
    enum: ['basic', 'premium', 'luxury']
  },
  services: [{
    type: String,
    enum: ['catering', 'photography', 'music', 'decor']
  }],
  eventDetails: {
    theme: {
      type: String,
      default: 'Traditional'
    },
    decorStyle: {
      type: String,
      default: 'Classic'
    },
    ceremonyType: {
      type: String,
      default: 'Traditional'
    },
    specialRequirements: String
  },
  servicesDetails: {
    catering: {
      menuType: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian', 'mixed'],
        default: 'mixed'
      },
      servingStyle: {
        type: String,
        enum: ['buffet', 'plated', 'family-style'],
        default: 'buffet'
      },
      specialDietRequirements: String
    },
    photography: {
      coverageHours: {
        type: Number,
        default: 8
      },
      includeVideography: {
        type: Boolean,
        default: true
      },
      specialShoots: [{
        type: String,
        enum: ['pre-wedding', 'engagement', 'mehendi', 'reception']
      }]
    },
    music: {
      type: {
        type: String,
        enum: ['dj', 'live-band', 'traditional'],
        default: 'dj'
      },
      duration: {
        type: Number,
        default: 6
      }
    },
    decor: {
      style: {
        type: String,
        enum: ['modern', 'traditional', 'rustic', 'luxury'],
        default: 'traditional'
      },
      colorScheme: String,
      specialDecorations: [String]
    }
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'phonepe', 'googlepay', 'paytm', 'upi', 'pending'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  transactionId: {
    type: String,
    default: function () {
      return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }
  },
  totalAmount: {
    type: Number,
    default: 300000 // Base amount in rupees
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    this.bookingId = `WED-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  if (!this.transactionId) {
    this.transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
