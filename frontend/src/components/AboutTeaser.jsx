import React from 'react'
import { Link } from 'react-router-dom'

const AboutTeaser = () => {
  return (
    <section className="about" id="about">
      <h1 className="heading"><span>about</span> us</h1>
      <div className="row">
        <div className="image">
          <img src="/assets/images/about-img.jpg" alt="About us" />
        </div>
        <div className="content">
          <h3>We will give you a very special celebration</h3>
          <p>
            Our team is dedicated to making your event unforgettable. We take care of every detail,
            ensuring that you can enjoy your day without any stress.
          </p>
          <div className="buttons">
            <Link to="/about" className="btn">More</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTeaser
