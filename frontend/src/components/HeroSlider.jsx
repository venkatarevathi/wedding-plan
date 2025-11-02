import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const HeroSlider = () => {
  const images = [
    '/assets/photos/decoration1.jpeg',
    '/assets/photos/Rings2.jpeg',
    '/assets/photos/together3.jpeg',
    '/assets/photos/mehandi hands4.jpeg',
    '/assets/photos/littlefingers5.jpeg',
    '/assets/photos/engaged6.jpeg',
    '/assets/photos/beautiful1.jpeg',
    '/assets/photos/girls togetherg10.jpeg',
    '/assets/photos/couple.jpeg',
    '/assets/photos/Memorable.jpeg'
  ]

  return (
    <section className="home" id="home">
      <div className="content">
        <h3>Your Dream <span>Wedding</span> Starts Here!</h3>
      </div>
      
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="home-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Wedding ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSlider
