import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const ReviewSlider = () => {
  const reviews = [
    {
      name: 'Leo',
      role: 'happy clients',
      image: '/assets/images/pic-1.png',
      review: 'Our corporate event was a great success, thanks to your excellent planning!'
    },
    {
      name: 'Riya',
      role: 'happy clients',
      image: '/assets/images/pic-2.png',
      review: 'The event was fantastic! Everything went perfectly, and the food was delicious!'
    },
    {
      name: 'John',
      role: 'happy clients',
      image: '/assets/images/pic-3.png',
      review: 'Thank you for making my birthday so special. The decorations were beautiful!'
    }
  ]

  return (
    <section className="reivew" id="review">
      <h1 className="heading">client's <span>review</span></h1>
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1050: { slidesPerView: 3 }
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="review-slider"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="box">
            <i className="fas fa-quote-right"></i>
            <div className="user">
              <img src={review.image} alt={review.name} />
              <div className="user-info">
                <h3>{review.name}</h3>
                <span>{review.role}</span>
              </div>
            </div>
            <p>{review.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ReviewSlider
