import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'username' && value.includes('@') ? value.toLowerCase() : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/auth/login', formData)
      const { token, user } = response.data

      login(token, user)
      toast.success(`Welcome back, ${user.fullname}!`)

      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      const errorMessage = error.response?.data?.error ||
        error.response?.data?.errors?.[0]?.msg ||
        'Login failed. Please check your credentials.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
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
          <input
            type="submit"
            className="btn"
            value={isSubmitting ? "Logging in..." : "Login"}
            disabled={isSubmitting}
          />
          <div>
            Don't have an Account? <Link to="/signup"><span>Signup Here</span></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
