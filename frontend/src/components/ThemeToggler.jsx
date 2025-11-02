import React, { useState } from 'react'

const ThemeToggler = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleTheme = () => {
    setIsActive(!isActive)
  }

  const changeTheme = (color) => {
    document.documentElement.style.setProperty('--main-color', color)
    setIsActive(false)
  }

  const colors = [
    '#3867d6',
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#f9ca24',
    '#f0932b',
    '#eb4d4b',
    '#6c5ce7'
  ]

  return (
    <div className={`theme-toggler ${isActive ? 'active' : ''}`}>
      <div className="toggle-btn" onClick={toggleTheme}>
        <i className="fas fa-cog"></i>
      </div>
      <h3>choose color</h3>
      <div className="buttons">
        {colors.map((color, index) => (
          <div
            key={index}
            className="theme-btn"
            style={{ background: color }}
            onClick={() => changeTheme(color)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ThemeToggler
