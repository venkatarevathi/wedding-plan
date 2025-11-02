import React from 'react'
import HeroSlider from '../components/HeroSlider'
import Services from '../components/Services'
import AboutTeaser from '../components/AboutTeaser'
import Gallery from '../components/Gallery'
import Pricing from '../components/Pricing'
import ReviewSlider from '../components/ReviewSlider'
import ContactForm from '../components/ContactForm'

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Services />
      <AboutTeaser />
      <Gallery />
      <Pricing />
      <ReviewSlider />
      <ContactForm />
    </div>
  )
}

export default Home
