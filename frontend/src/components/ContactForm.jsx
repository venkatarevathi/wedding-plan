import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/contact', formData)
      // show both toast and inline response message
      toast.success(response.data.message)
      setResponseMessage(response.data.message || 'Message sent successfully!')
      setFormData({
        name: '',
        email: '',
        number: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send message'
      toast.error(errorMessage)
      setResponseMessage(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <h1 className="heading"><span>contact</span> us</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputBox">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputBox">
          <input
            type="tel"
            name="number"
            placeholder="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="your message"
          cols="30"
          rows="10"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="submit"
          value={isSubmitting ? "Sending..." : "send message"}
          className="btn"
          disabled={isSubmitting}
        />
      </form>
      <p
        id="response-message"
        style={{ color: responseMessage ? 'green' : 'transparent', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem' }}
      >
        {responseMessage}
      </p>
    </section>
  )
}

export default ContactForm
