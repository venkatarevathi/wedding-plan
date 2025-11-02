import React, { useEffect, useState } from 'react'

const Gallery = () => {
  const [sideBySide, setSideBySide] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSideBySide(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const images = [
    '/assets/photos/rings on handg1.jpeg',
    '/assets/photos/beautifulg2.jpeg',
    '/assets/photos/maing3.jpeg',
    '/assets/photos/potg4.jpeg',
    '/assets/photos/holding handsg5.jpeg',
    '/assets/photos/123g6.jpeg',
    '/assets/photos/puppyg7.jpeg',
    '/assets/photos/legsg8.jpeg',
    '/assets/photos/deco.jpeg',
    '/assets/photos/couple.jpeg',
    '/assets/photos/Memorable.jpeg',
    '/assets/photos/moon.jpeg'
  ]

  return (
    <section className="gallery" id="gallery">
      <h1 className="heading">our <span>gallery</span></h1>
      <div className={`box-container ${sideBySide ? 'side-by-side' : 'stacked'}`}>
        {images.map((image, index) => (
          <div key={index} className="box">
            <img src={image} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
