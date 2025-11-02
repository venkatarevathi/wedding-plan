import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/about.css'

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>More about us</h1>
        <Link to="/" className="btn">Back to Home</Link>
      </header>

      <section className="image">
        <h2>Your Dream Wedding Awaits</h2>
        <div className="row">
          <img src="/assets/images/about1.jpeg" alt="Beautiful Wedding Setup" className="image" />
          <p>
            We specialize in creating unforgettable wedding experiences tailored to your unique vision.
            Our dedicated team of wedding planners is here to guide you every step of the way. At VIVAH,
            we believe every love story is unique and deserves a celebration as special as the couple.
            We craft experiences that capture your journey, highlighting meaningful moments and personalizing
            every detail to reflect your love story. Weddings are more than events—they're the start of a
            lifetime of memories. Our team ensures every element, from décor to ambiance, is thoughtfully
            planned to create a celebration that is beautiful, emotional, and unforgettable. With creativity
            and dedication, we turn your dreams into a seamless and cherished experience.
          </p>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <ul>
          <li><strong>Full-Service Wedding Planning:</strong> From venue selection to day-of coordination, we handle every detail.</li>
          <li><strong>Partial Wedding Planning:</strong> Need help with specific aspects? We can assist with vendor selection, timelines, and more.</li>
          <li><strong>Day-of Coordination:</strong> Relax and enjoy your day while we manage the logistics and ensure everything runs smoothly.</li>
          <li><strong>Destination Weddings:</strong> Planning a wedding abroad? We specialize in destination weddings and can help with travel arrangements.</li>
        </ul>
      </section>

      <section className="process">
        <h2>Our Planning Process</h2>
        <p>We believe in a personalized approach to wedding planning. Here's how we work with you:</p>
        <ol>
          <li><strong>Initial Consultation:</strong> We discuss your vision, budget, and preferences.</li>
          <li><strong>Design & Planning:</strong> We create a customized plan that reflects your style and needs.</li>
          <li><strong>Vendor Coordination:</strong> We connect you with trusted vendors and manage all communications.</li>
          <li><strong>Final Details:</strong> We finalize all details and create a timeline for your big day.</li>
          <li><strong>Day-of Coordination:</strong> Our team will be there to ensure everything goes as planned.</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          <p>"The team made our wedding day absolutely perfect! They took care of everything, and we couldn't have been happier!"</p>
          <footer>- Happy Couple</footer>
        </blockquote>
        <blockquote>
          <p>"The team was professional, attentive, and truly understood our vision. Highly recommend!"</p>
          <footer>- Satisfied Client</footer>
        </blockquote>
      </section>

      <section className="contact">
        <h2>Get in Touch</h2>
        <p>If you're ready to start planning your dream wedding, <Link to="/">contact us</Link> today for a consultation!</p>
      </section>

      <footer>
        <p>&copy; 2023 VIVAH. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default About
