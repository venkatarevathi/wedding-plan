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
  const [responseType, setResponseType] = useState('') // 'success' | 'error' | ''

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Client-side validation to avoid backend 400
    const validationErrors = []
    if (!formData.name || formData.name.trim().length < 2) validationErrors.push('Name must be at least 2 characters')
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) validationErrors.push('Valid email is required')
    if (!formData.number || formData.number.trim().replace(/\D/g, '').length < 10) validationErrors.push('Valid phone number is required')
    if (!formData.subject || formData.subject.trim().length < 3) validationErrors.push('Subject must be at least 3 characters')
    if (!formData.message || formData.message.trim().length < 10) validationErrors.push('Message must be at least 10 characters')

    if (validationErrors.length) {
      const joined = validationErrors.join('; ')
      toast.error(joined)
      setResponseType('error')
      setResponseMessage(joined)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await axios.post('/api/contact', formData)
      // show both toast and inline response message (use fallback text)
      // use the exact message requested: "message sent successfully"
      const msg = response.data?.message || 'message sent successfully'
      toast.success(msg)
      setResponseType('success')
      setResponseMessage(msg)
      setFormData({
        name: '',
        email: '',
        number: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      // gather useful error info for debugging and user feedback
      console.error('Contact form submit error:', error)
      const status = error.response?.status
      // If backend returned validation errors array, join them
      const errorsArray = error.response?.data?.errors
      let serverMsg = error.response?.data?.message || error.response?.data?.error
      if (Array.isArray(errorsArray) && errorsArray.length) {
        serverMsg = errorsArray.map(e => e.msg || e.message).join('; ')
      }
      const errorMessage = serverMsg || (status ? `Failed to send message (status ${status})` : 'Failed to send message')
      toast.error(errorMessage)
      setResponseType('error')
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
        style={{ color: responseType === 'success' ? 'green' : responseType === 'error' ? 'red' : 'transparent', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem' }}
      >
        {responseMessage}
      </p>
    </section>
  )
}

export default ContactForm
