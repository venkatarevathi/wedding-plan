import React from 'react'

const Services = () => {
  const services = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'venue selection',
      description: 'Find the perfect venue for your special day!'
    },
    {
      icon: 'fas fa-envelope',
      title: 'invitation card',
      description: 'Custom invitation cards for every occasion.'
    },
    {
      icon: 'fas fa-music',
      title: 'entertainment',
      description: 'Live music and entertainment to keep the party going!'
    },
    {
      icon: 'fas fa-utensils',
      title: 'food and drinks',
      description: 'Delicious catering options to satisfy every palate!'
    },
    {
      icon: 'fas fa-photo-video',
      title: 'photos and videos',
      description: 'Capture your beautiful moments with our expert photographers.'
    },
    {
      icon: 'fas fa-birthday-cake',
      title: 'custom food',
      description: 'Get personalized food menus that cater to your taste!'
    }
  ]

  return (
    <section className="service" id="service">
      <h1 className="heading">our <span>services</span></h1>
      <div className="box-container">
        {services.map((service, index) => (
          <div key={index} className="box">
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
