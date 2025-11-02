import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const hideNavPaths = ['/checkout', '/login', '/signup', '/about']
  const showNav = !hideNavPaths.includes(location.pathname)
  const hideLogoPaths = ['/login', '/signup', '/checkout', '/about']
  const showLogo = !hideLogoPaths.includes(location.pathname)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      {showLogo && (
        <Link to="/" className="logo">
          <span>Let's Celebrate </span>Together
        </Link>
      )}

      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        {showNav && (
          <>
            <a href="#home" onClick={() => scrollToSection('home')}>home</a>
            <a href="#service" onClick={() => scrollToSection('service')}>service</a>
            <a href="#about" onClick={() => scrollToSection('about')}>about</a>
            <a href="#gallery" onClick={() => scrollToSection('gallery')}>gallery</a>
            <a href="#price" onClick={() => scrollToSection('price')}>price</a>
            <a href="#review" onClick={() => scrollToSection('review')}>review</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>contact</a>
          </>
        )}

        {user ? (
          <>
            <span className="user-greeting">Hello, {user.fullname}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            {showNav && <Link to="/login">Login</Link>}
            {showNav && location.pathname !== '/' && <Link to="/signup">Sign up</Link>}
          </>
        )}
      </nav>

      {showNav && (
        <div
          id="menu-bars"
          className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  )
}

export default Header
