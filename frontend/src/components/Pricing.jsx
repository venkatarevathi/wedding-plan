import React from 'react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  return (
    <section className="price" id="price">
      <h1 className="heading">our <span>packages</span></h1>
      <div className="box-container">
        <div className="box">
          <h3 className="title">Basic Celebration</h3>
          <h3 className="amount">From ₹5,00,000 to ₹10,00,000</h3>
          <p>
            Perfect for small gatherings and intimate celebrations. This package includes:
          </p>
          <ul>
            <li><i className="fas fa-check"></i>Venue arrangement</li>
            <li><i className="fas fa-check"></i>Basic decorations</li>
            <li><i className="fas fa-check"></i>Photography coverage</li>
            <li><i className="fas fa-check"></i>Food & beverages (standard menu)</li>
          </ul>
          <Link to="/checkout" className="btn">Book Now</Link>
        </div>

        <div className="box">
          <h3 className="title">Premium Wedding</h3>
          <h3 className="amount">From ₹10,00,000 to ₹25,00,000</h3>
          <p>
            A complete event package designed for dream weddings with personalized services:
          </p>
          <ul>
            <li><i className="fas fa-check"></i>Theme-based decoration</li>
            <li><i className="fas fa-check"></i>Invitation design & printing</li>
            <li><i className="fas fa-check"></i>Live music & entertainment</li>
            <li><i className="fas fa-check"></i>Professional photography & videography</li>
            <li><i className="fas fa-check"></i>Multi-course catering options</li>
          </ul>
          <Link to="/checkout" className="btn">Book Now</Link>
        </div>

        <div className="box">
          <h3 className="title">Luxury Grand Event</h3>
          <h3 className="amount">From ₹25,00,000 to ₹50,00,000</h3>
          <p>
            Our most luxurious package for those who want a royal experience:
          </p>
          <ul>
            <li><i className="fas fa-check"></i>Exclusive venue & custom theme</li>
            <li><i className="fas fa-check"></i>Designer invitations & gifts</li>
            <li><i className="fas fa-check"></i>Celebrity performance arrangements</li>
            <li><i className="fas fa-check"></i>High-end food, drinks & décor</li>
            <li><i className="fas fa-check"></i>Drone & cinematic video coverage</li>
          </ul>
          <Link to="/checkout" className="btn">Book Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Pricing
