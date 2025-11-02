import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/payment-details.css';

const PaymentDetails = () => {
  const location = useLocation();
  const bookingResult = location.state?.bookingResult;

  // Set background color for full page
  React.useEffect(() => {
    document.body.style.background = '#f5f5f5';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  if (!bookingResult) {
    return (
      <div className="container">
        <div className="confirmation">
          <h2>No Payment Details Found</h2>
          <p>Unable to find payment details. Please check your bookings.</p>
          <Link to="/" className="back-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="booking-success">
        <div className="success-header">
          <h2>🎉 Booking Confirmed Successfully!</h2>
          <div className="success-badge">
            <span className="checkmark">✓</span>
          </div>
        </div>

        <div className="booking-receipt">
          {/* Booking Summary Card */}
          <div className="receipt-card main-details">
            <div className="card-header">
              <h3>💑 Wedding Booking Details</h3>
              <p className="timestamp">Booked on: {new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            <div className="couple-info">
              <h4>👰 Bride & Groom</h4>
              <p className="names">{bookingResult.bride} & {bookingResult.groom}</p>
              <p className="contact">
                <span>📧 {bookingResult.email}</span>
              </p>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="receipt-card event-details">
            <h3>📅 Event Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Wedding Date</span>
                <span className="value">{new Date(bookingResult.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="detail-item">
                <span className="label">Ceremony Time</span>
                <span className="value">{bookingResult.time}</span>
              </div>
              <div className="detail-item">
                <span className="label">Venue Type</span>
                <span className="value">{bookingResult.venue.charAt(0).toUpperCase() + bookingResult.venue.slice(1)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Guest Count</span>
                <span className="value">{bookingResult.guests} guests</span>
              </div>
            </div>
          </div>

          {/* Package Details Card */}
          <div className="receipt-card package-details">
            <h3>📦 Package & Services</h3>
            <div className="package-info">
              <div className="selected-package">
                <h4>{bookingResult.package.charAt(0).toUpperCase() + bookingResult.package.slice(1)} Package</h4>
                <p className="package-description">
                  {bookingResult.package === 'basic' && 'Perfect for intimate celebrations'}
                  {bookingResult.package === 'premium' && 'Complete event package with premium services'}
                  {bookingResult.package === 'luxury' && 'Luxury experience with exclusive services'}
                </p>
              </div>
              <div className="additional-services">
                <h4>Additional Services</h4>
                <div className="services-list">
                  {bookingResult.services && bookingResult.services.length > 0 ? (
                    bookingResult.services.map(service => (
                      <span key={service} className="service-tag">
                        {service.charAt(0).toUpperCase() + service.slice(1)}
                      </span>
                    ))
                  ) : (
                    <span className="no-services">No additional services selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Event Theme Details */}
          <div className="receipt-card theme-details">
            <h3>🎭 Event Theme Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Theme</span>
                <span className="value">{bookingResult.eventDetails?.theme || 'Traditional'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Decor Style</span>
                <span className="value">{bookingResult.eventDetails?.decorStyle || 'Classic'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Ceremony Type</span>
                <span className="value">{bookingResult.eventDetails?.ceremonyType || 'Traditional'}</span>
              </div>
              {bookingResult.eventDetails?.specialRequirements && (
                <div className="detail-item full-width">
                  <span className="label">Special Requirements</span>
                  <span className="value special-requirements">{bookingResult.eventDetails.specialRequirements}</span>
                </div>
              )}
            </div>
          </div>

          {/* Services Details */}
          {bookingResult.services && bookingResult.services.length > 0 && (
            <div className="receipt-card services-details">
              <h3>🎯 Detailed Services</h3>

              {bookingResult.services.includes('catering') && (
                <div className="service-section">
                  <h4>🍽️ Catering Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Menu Type</span>
                      <span className="value">{(bookingResult.servicesDetails?.catering?.menuType || 'Mixed').charAt(0).toUpperCase() +
                        (bookingResult.servicesDetails?.catering?.menuType || 'Mixed').slice(1)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Serving Style</span>
                      <span className="value">{(bookingResult.servicesDetails?.catering?.servingStyle || 'Buffet').charAt(0).toUpperCase() +
                        (bookingResult.servicesDetails?.catering?.servingStyle || 'Buffet').slice(1)}</span>
                    </div>
                    {bookingResult.servicesDetails?.catering?.specialDietRequirements && (
                      <div className="detail-item full-width">
                        <span className="label">Special Diet Requirements</span>
                        <span className="value">{bookingResult.servicesDetails.catering.specialDietRequirements}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {bookingResult.services.includes('photography') && (
                <div className="service-section">
                  <h4>📸 Photography Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Coverage Hours</span>
                      <span className="value">{bookingResult.servicesDetails?.photography?.coverageHours || 8} hours</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Videography</span>
                      <span className="value">{bookingResult.servicesDetails?.photography?.includeVideography ? 'Included' : 'Not Included'}</span>
                    </div>
                    {bookingResult.servicesDetails?.photography?.specialShoots && (
                      <div className="detail-item full-width">
                        <span className="label">Special Shoots</span>
                        <div className="tags-container">
                          {bookingResult.servicesDetails.photography.specialShoots.map(shoot => (
                            <span key={shoot} className="photo-shoot-tag">{shoot}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {bookingResult.services.includes('music') && (
                <div className="service-section">
                  <h4>🎵 Music Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Entertainment Type</span>
                      <span className="value">{(bookingResult.servicesDetails?.music?.type || 'DJ').toUpperCase()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Duration</span>
                      <span className="value">{bookingResult.servicesDetails?.music?.duration || 6} hours</span>
                    </div>
                  </div>
                </div>
              )}

              {bookingResult.services.includes('decor') && (
                <div className="service-section">
                  <h4>🎨 Decor Details</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Decor Style</span>
                      <span className="value">{(bookingResult.servicesDetails?.decor?.style || 'Traditional').charAt(0).toUpperCase() +
                        (bookingResult.servicesDetails?.decor?.style || 'Traditional').slice(1)}</span>
                    </div>
                    {bookingResult.servicesDetails?.decor?.colorScheme && (
                      <div className="detail-item">
                        <span className="label">Color Scheme</span>
                        <span className="value">{bookingResult.servicesDetails.decor.colorScheme}</span>
                      </div>
                    )}
                    {bookingResult.servicesDetails?.decor?.specialDecorations && (
                      <div className="detail-item full-width">
                        <span className="label">Special Decorations</span>
                        <div className="tags-container">
                          {bookingResult.servicesDetails.decor.specialDecorations.map((item, index) => (
                            <span key={index} className="decor-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payment Details Card */}
          <div className="receipt-card payment-details">
            <h3>💳 Payment Information</h3>
            <div className="payment-info">
              <div className="transaction-details">
                <div className="detail-row">
                  <span className="label">Booking ID</span>
                  <span className="value highlight">{bookingResult.bookingId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Transaction ID</span>
                  <span className="value highlight">{bookingResult.transactionId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Payment Method</span>
                  <span className="value">{bookingResult.paymentMethod.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status</span>
                  <span className="value status-badge">
                    ✓ Payment Confirmed
                  </span>
                </div>
              </div>
              <div className="amount-details">
                <div className="amount-row subtotal">
                  <span>Package Amount</span>
                  <span>₹{bookingResult.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="amount-row grand-total">
                  <span>Total Amount Paid</span>
                  <span>₹{bookingResult.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="receipt-card footer-note">
            <p>
              <span className="emoji">📧</span> A confirmation email has been sent to {bookingResult.email}
            </p>
            <p>
              <span className="emoji">📞</span> Our wedding coordinator will contact you within 24 hours
            </p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => window.print()} className="print-btn">
              🖨️ Download Receipt
            </button>
            <Link to="/" className="home-btn">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;