import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  // Hide footer entirely on checkout, login, signup, and about pages
  if (['/checkout', '/login', '/signup', '/about'].includes(location.pathname)) {
    return null
  }

  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>branches</h3>
          <a href="#"><i className="fas fa-map-marker-alt"></i> Guntur</a>
          <a href="#"><i className="fas fa-map-marker-alt"></i> hyderabad</a>
          <a href="#"><i className="fas fa-map-marker-alt"></i> vijayawada</a>
          <a href="#"><i className="fas fa-map-marker-alt"></i> mumbai</a>
          <a href="#"><i className="fas fa-map-marker-alt"></i> vizag</a>
        </div>
        <div className="box">
          <h3>quick links</h3>
          <a href="#"><i className="fas fa-arrow-right"></i> home</a>
          <a href="#"><i className="fas fa-arrow-right"></i> service</a>
          <a href="#"><i className="fas fa-arrow-right"></i> about</a>
          <a href="#"><i className="fas fa-arrow-right"></i> gallery</a>
          <a href="#"><i className="fas fa-arrow-right"></i> price</a>
          <a href="#"><i className="fas fa-arrow-right"></i> review</a>
          <a href="#"><i className="fas fa-arrow-right"></i> contact</a>
        </div>
        <div className="box">
          <h3>contact info</h3>
          <a href="#"><i className="fas fa-phone"></i> +91 7569094287</a>
          <a href="#"><i className="fas fa-phone"></i> +91 7569094287</a>
          <a href="#"><i className="fas fa-envelope"></i> revathinelakurthi@gmail.com</a>
          <a href="#"><i className="fas fa-envelope"></i> abc@gmail.com</a>
          <a href="#"><i className="fas fa-map-marker-alt"></i> Hyderabad, india - 400104</a>
        </div>
        <div className="box">
          <h3>follow us</h3>
          <a href="#"><i className="fab fa-facebook-f"></i> facebook</a>
          <a href="#"><i className="fab fa-twitter"></i> twitter</a>
          <a href="#"><i className="fab fa-instagram"></i> instagram</a>
          <a href="#"><i className="fab fa-linkedin"></i> linkedin</a>
        </div>
      </div>
      <div className="credit">created by <span>Batch 11</span> | all rights reserved</div>
    </section>
  )
}

export default Footer
