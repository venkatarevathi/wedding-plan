import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/checkout.css'

const Checkout = () => {
  const [formData, setFormData] = useState({
    groom: '',
    bride: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    venue: '',
    package: '',
    services: []
  })
  const [groomImageFile, setGroomImageFile] = useState(null)
  const [brideImageFile, setBrideImageFile] = useState(null)
  const [groomImagePreview, setGroomImagePreview] = useState(null)
  const [brideImagePreview, setBrideImagePreview] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [currentBookingId, setCurrentBookingId] = useState(null)
  const [showPaymentSection, setShowPaymentSection] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox' && name === 'services') {
      setFormData(prev => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (!files || files.length === 0) return
    const file = files[0]

    // create preview URL
    const preview = URL.createObjectURL(file)

    if (name === 'groomImage') {
      setGroomImageFile(file)
      setGroomImagePreview(preview)
    } else if (name === 'brideImage') {
      setBrideImageFile(file)
      setBrideImagePreview(preview)
    }
  }

  // Modal & payment flow states
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(true)
  const [showCreditCardSection, setShowCreditCardSection] = useState(false)
  const [showUpiSection, setShowUpiSection] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardProcessing, setCardProcessing] = useState(false)
  const [upiProcessing, setUpiProcessing] = useState(false)
  const [cardHolderName, setCardHolderName] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [upiId, setUpiId] = useState('')

  const paymentSectionRef = React.useRef(null)

  const handleInitialSubmit = async (e) => {
    e.preventDefault()

    // simple validation similar to uploaded HTML
    if (!formData.groom || !formData.bride || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields!')
      return
    }

    if (!formData.package) {
      toast.error('Please select a package!')
      return
    }

    // Prepare booking data
    const packagePrices = {
      basic: 500000, // ₹5,00,000
      premium: 1000000, // ₹10,00,000
      luxury: 2500000 // ₹25,00,000
    }
    const amount = packagePrices[formData.package] || 0

    // Create booking data object matching the backend schema
    const bookingData = {
      groom: formData.groom,
      bride: formData.bride,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      venue: formData.venue,
      package: formData.package,
      services: formData.services,
      status: 'pending',
      totalAmount: amount
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('https://wedding-plan-backend-aws0.onrender.com/api/bookings', bookingData)

      if (response.data && response.data.booking && response.data.booking._id) {
        setCurrentBookingId(response.data.booking._id)
        setBookingResult(response.data.booking)
        toast.success('Booking details saved successfully!')
        // Show booking confirmation modal
        setShowBookingModal(true)
        // Scroll to payment section
        setTimeout(() => {
          paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        throw new Error('Invalid server response')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error(error.response?.data?.error || 'Server error. Please try again.')
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
  }

  const selectPackage = (pkg) => {
    setFormData(prev => ({ ...prev, package: pkg }))
  }

  const selectPaymentMethod = (method, e) => {
    if (e && e.currentTarget) {
      // no-op: in HTML they used event.currentTarget to add classes; here class is derived from state
    }
    setPaymentMethod(method)
    // hide payment methods and show appropriate section
    setShowPaymentMethods(false)
    setShowCreditCardSection(method === 'credit-card')
    setShowUpiSection(method !== 'credit-card')
  }

  const backToPaymentMethods = () => {
    setShowPaymentMethods(true)
    setShowCreditCardSection(false)
    setShowUpiSection(false)
    setPaymentMethod('')
  }

  const processCardPayment = () => {
    // basic validation
    if (!cardNumber || cardNumber.replace(/\s+/g, '').length < 12) {
      toast.error('Please enter a valid card number')
      return
    }
    if (!cardHolderName) {
      toast.error('Please enter card holder name')
      return
    }
    if (!expirationDate) {
      toast.error('Please select expiration date')
      return
    }
    if (!cvv) {
      toast.error('Please enter CVV')
      return
    }

    setCardProcessing(true)
    toast.success('Processing payment...')
    // simulate processing then complete booking
    setTimeout(() => {
      simulateSuccessfulPayment()
    }, 2000)
  }

  const processUpiPayment = () => {
    // Validate UPI ID
    if (!upiId || !upiId.includes('@')) {
      toast.error('Please enter a valid UPI ID')
      return
    }

    setUpiProcessing(true)
    toast.success('Processing payment...')
    setTimeout(() => {
      simulateSuccessfulPayment()
    }, 2000)
  }

  const simulateSuccessfulPayment = async () => {
    // simulate finalization and then call completeBooking
    setTimeout(() => {
      completeBooking()
    }, 1500)
  }

  const handleCardInput = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let formattedValue = ''
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formattedValue += ' '
      formattedValue += value[i]
    }
    setCardNumber(formattedValue)
  }

  const completeBooking = async () => {
    if (!currentBookingId) {
      toast.error('No active booking found! Please try again.')
      return
    }

    // Update booking with payment details
    const paymentData = {
      paymentMethod: paymentMethod,
      status: 'confirmed',
      // Add payment details based on method
      paymentDetails: paymentMethod === 'credit-card'
        ? {
          cardNumber: cardNumber.replace(/\s+/g, '').slice(-4),
          cardHolder: cardHolderName,
          billingAddress: billingAddress
        }
        : {
          upiId: upiId
        }
    }

    // Hide form and show confirmation locally
    setShowBookingModal(false)
    setShowPaymentMethods(false)
    setShowCreditCardSection(false)
    setShowUpiSection(false)
    setIsSubmitting(true)

    // Generate temporary booking ID and transaction ID for display
    const tempBookingId = `WED-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const tempTransactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    try {
      // Update booking with payment details
      const response = await axios.put(`https://wedding-plan-backend-aws0.onrender.com/api/bookings/${currentBookingId}/complete`, paymentData)

      if (response.data && response.data.booking) {
        // Combine the response data with temporary IDs if they're not provided by the backend
        const finalBookingResult = {
          ...response.data.booking,
          bookingId: response.data.booking.bookingId || tempBookingId,
          transactionId: response.data.booking.transactionId || tempTransactionId
        }
        setBookingResult(finalBookingResult)

        // Clear all states after successful payment
        setFormData({
          groom: '',
          bride: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '',
          venue: '',
          package: '',
          services: []
        })

        // Reset payment states
        setPaymentMethod('')
        setCardNumber('')
        setCardHolderName('')
        setExpirationDate('')
        setCvv('')
        setBillingAddress('')
        setUpiId('')
        setCurrentBookingId(null)
        setShowPaymentSection(false)
        setCardProcessing(false)
        setUpiProcessing(false)

        // Show success message and confirmation
        toast.success('Payment completed successfully! Your booking is confirmed.')

        // Show confirmation section
        setShowConfirmation(true)
      } else {
        throw new Error('Invalid server response')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Failed to process payment. Please try again.')
      setCardProcessing(false)
      setUpiProcessing(false)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setShowConfirmation(true)
  }

  if (showConfirmation && bookingResult) {
    // Navigate to payment details page with the booking result
    return (
      <Navigate
        to="/payment-details"
        state={{
          bookingResult: {
            ...bookingResult,
            paymentMethod: paymentMethod || 'credit-card',
            status: 'confirmed',
            date: formData.date,
            time: formData.time,
            venue: formData.venue,
            guests: formData.guests,
            package: formData.package,
            services: formData.services,
            email: formData.email
          }
        }}
        replace
      />
    );
  }

  return (
    <div className="container">
      <h1>💍 Wedding Booking System</h1>
      <form onSubmit={handleInitialSubmit}>
        <div className="form-section">
          <h2>Couple Information</h2>
          <label>Groom's Full Name:
            <input type="text" name="groom" value={formData.groom} onChange={handleChange} required />
          </label>
          <label>Bride's Full Name:
            <input type="text" name="bride" value={formData.bride} onChange={handleChange} required />
          </label>
          <label>Groom's Photo:
            <input type="file" name="groomImage" accept="image/*" onChange={handleFileChange} />
          </label>
          {groomImagePreview && <img src={groomImagePreview} alt="Groom preview" className="preview-image" />}
          <label>Bride's Photo:
            <input type="file" name="brideImage" accept="image/*" onChange={handleFileChange} />
          </label>
          {brideImagePreview && <img src={brideImagePreview} alt="Bride preview" className="preview-image" />}
          <label>Contact Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>Phone Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-section">
          <h2>Event Details</h2>
          <label>Wedding Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>Ceremony Time:
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>
          <label>Number of Guests:
            <input type="number" name="guests" min="50" max="500" value={formData.guests} onChange={handleChange} required />
          </label>
          <label>Venue Type:
            <select name="venue" value={formData.venue} onChange={handleChange} required>
              <option value="">Select Venue</option>
              <option value="church">Church</option>
              <option value="garden">Garden</option>
              <option value="banquet">Banquet Hall</option>
              <option value="beach">Beach</option>
            </select>
          </label>
        </div>

        <div className="form-section">
          <h2>Select Package</h2>
          <div className="package-options">
            <div
              className={`package-card ${formData.package === 'basic' ? 'selected' : ''}`}
              onClick={() => selectPackage('basic')}
            >
              <h3 className="title">Basic Celebration</h3>
              <h3 className="amount">From ₹5,00,000 to ₹10,00,000</h3>
              <p>Perfect for small gatherings and intimate celebrations. This package includes:</p>
              <ul>
                <li><i className="fas fa-check"></i> Venue arrangement</li>
                <li><i className="fas fa-check"></i> Basic decorations</li>
                <li><i className="fas fa-check"></i> Photography coverage</li>
                <li><i className="fas fa-check"></i> Food & beverages (standard menu)</li>
              </ul>
            </div>

            <div
              className={`package-card ${formData.package === 'premium' ? 'selected' : ''}`}
              onClick={() => selectPackage('premium')}
            >
              <h3 className="title">Premium Wedding</h3>
              <h3 className="amount">From ₹10,00,000 to ₹25,00,000</h3>
              <p>A complete event package designed for dream weddings with personalized services:</p>
              <ul>
                <li><i className="fas fa-check"></i> Theme-based decoration</li>
                <li><i className="fas fa-check"></i> Invitation design & printing</li>
                <li><i className="fas fa-check"></i> Live music & entertainment</li>
                <li><i className="fas fa-check"></i> Professional photography & videography</li>
                <li><i className="fas fa-check"></i> Multi-course catering options</li>
              </ul>
            </div>

            <div
              className={`package-card ${formData.package === 'luxury' ? 'selected' : ''}`}
              onClick={() => selectPackage('luxury')}
            >
              <h3 className="title">Luxury Grand Event</h3>
              <h3 className="amount">From ₹25,00,000 to ₹50,00,000</h3>
              <p>Our most luxurious package for those who want a royal experience:</p>
              <ul>
                <li><i className="fas fa-check"></i> Exclusive venue & custom theme</li>
                <li><i className="fas fa-check"></i> Designer invitations & gifts</li>
                <li><i className="fas fa-check"></i> Celebrity performance arrangements</li>
                <li><i className="fas fa-check"></i> High-end food, drinks & décor</li>
                <li><i className="fas fa-check"></i> Drone & cinematic video coverage</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Additional Services</h2>
          {['catering', 'photography', 'music', 'decor'].map(service => (
            <label key={service}>
              <input
                type="checkbox"
                name="services"
                value={service}
                checked={formData.services.includes(service)}
                onChange={handleChange}
              /> {service.charAt(0).toUpperCase() + service.slice(1)} Service
            </label>
          ))}
        </div>

        <button type="submit" disabled={isSubmitting} className="book-now-btn">
          {isSubmitting ? 'Processing...' : 'Book Now'}
        </button>

        <div className="form-section" ref={paymentSectionRef}>
          <h2>Payment Method</h2>
          {/* Payment selection area */}
          {showPaymentMethods && (
            <div className="payment-methods">
              <div
                className={`payment-method ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
                onClick={(e) => selectPaymentMethod('credit-card', e)}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/179/179457.png" alt="Credit Card" />
                <span>Credit/Debit Card</span>
              </div>
              <div
                className={`payment-method ${paymentMethod === 'phonepe' ? 'selected' : ''}`}
                onClick={(e) => selectPaymentMethod('phonepe', e)}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/800px-PhonePe_Logo.png" alt="PhonePe" />
                <span>PhonePe</span>
              </div>
              <div
                className={`payment-method ${paymentMethod === 'googlepay' ? 'selected' : ''}`}
                onClick={(e) => selectPaymentMethod('googlepay', e)}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/2560px-Google_Pay_Logo_%282020%29.svg.png" alt="Google Pay" />
                <span>Google Pay</span>
              </div>
              <div
                className={`payment-method ${paymentMethod === 'paytm' ? 'selected' : ''}`}
                onClick={(e) => selectPaymentMethod('paytm', e)}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%282018%29.svg/2560px-Paytm_Logo_%282018%29.svg.png" alt="Paytm" />
                <span>Paytm</span>
              </div>
              <div
                className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={(e) => selectPaymentMethod('upi', e)}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" />
                <span>UPI</span>
              </div>
            </div>
          )}

          {/* Credit card section */}
          {showCreditCardSection && (
            <div id="creditCardSection" className={`credit-card-section ${showCreditCardSection ? 'active' : ''}`}>
              <h3>Credit Card Details</h3>
              <label>Card Number:
                <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardInput} placeholder="1234 5678 9012 3456" maxLength={23} />
              </label>
              <label>Card Holder Name:
                <input type="text" id="cardHolderName" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} placeholder="John Doe" />
              </label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ flex: 1 }}>Expiration Date:
                  <input type="month" id="expirationDate" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
                </label>
                <label style={{ flex: 1 }}>CVV:
                  <input type="password" id="cvv" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="***" maxLength={3} />
                </label>
              </div>
              <label>Billing Address:
                <input type="text" id="billingAddress" value={billingAddress} onChange={e => setBillingAddress(e.target.value)} />
              </label>
              <button type="button" onClick={processCardPayment}>{cardProcessing ? (<><span className="spinner"></span> Processing...</>) : 'Pay Now'}</button>
              <button type="button" className="back-btn" onClick={backToPaymentMethods} style={{ background: 'none', color: 'var(--primary)' }}>Back to Payment Methods</button>
            </div>
          )}

          {/* UPI / other wallets section */}
          {showUpiSection && (
            <div id="upiSection" className={`upi-section ${showUpiSection ? 'active' : ''}`}>
              <h3>UPI Payment</h3>
              <label>UPI ID:
                <input type="text" id="upiId" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="username@upi" />
              </label>
              <button type="button" onClick={processUpiPayment}>{upiProcessing ? (<><span className="spinner"></span> Processing...</>) : 'Pay Now'}</button>
              <button type="button" className="back-btn" onClick={backToPaymentMethods} style={{ background: 'none', color: 'var(--primary)' }}>Back to Payment Methods</button>
            </div>
          )}
        </div>
      </form>

      {/* Booking confirmation modal (shown after initial submit) */}
      <div className={`modal-overlay ${showBookingModal ? 'active' : ''}`} style={{ display: showBookingModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-header">
            <h3>Confirm Your Booking</h3>
          </div>
          <div className="modal-body">
            <p>Please confirm your wedding booking details:</p>
            <div id="bookingSummary">
              <div className="summary-item"><span className="summary-label">Couple:</span> <span className="summary-value">{formData.groom} &amp; {formData.bride}</span></div>
              <div className="summary-item"><span className="summary-label">Date:</span> <span className="summary-value">{formData.date || 'Not specified'}</span></div>
              <div className="summary-item"><span className="summary-label">Time:</span> <span className="summary-value">{formData.time || 'Not specified'}</span></div>
              <div className="summary-item"><span className="summary-label">Venue:</span> <span className="summary-value">{formData.venue || 'Not specified'}</span></div>
              <div className="summary-item"><span className="summary-label">Guests:</span> <span className="summary-value">{formData.guests || 'Not specified'}</span></div>
              <div className="summary-item"><span className="summary-label">Package:</span> <span className="summary-value">{formData.package}</span></div>
              <div className="summary-item"><span className="summary-label">Services:</span> <span className="summary-value">{formData.services.length > 0 ? formData.services.join(', ') : 'None selected'}</span></div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={() => setShowBookingModal(false)}>Cancel</button>
            <button type="button" onClick={() => {
              setShowBookingModal(false);
              toast.success('Booking details confirmed! Please complete your payment.');
              setTimeout(() => {
                paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}>Confirm &amp; Proceed to Payment</button>
          </div>
        </div>
      </div>

      <Link to="/" className="btn">Back to Home</Link>
    </div>
  )
}

export default Checkout
