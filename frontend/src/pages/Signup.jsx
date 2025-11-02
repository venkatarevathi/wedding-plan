import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.fullname.trim() || !formData.email.trim() ||
      !formData.username.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    setIsSubmitting(true)

    try {
      const { confirmPassword, ...submitData } = formData
      await axios.post('/api/auth/register', submitData)

      toast.success('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        error.response?.data?.errors?.[0]?.msg ||
        'Registration failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="submit"
            className="btn"
            value={isSubmitting ? "Signing up..." : "Sign Up"}
            disabled={isSubmitting}
          />
          <div>
            Already have an Account? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
