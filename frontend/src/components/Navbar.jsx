import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [theme, setTheme] = useState()

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark'|| (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  },[])

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark')
    } else if (localStorage.getItem('theme') === 'light') {
      document.body.classList.remove('dark')
    }
  }, [theme])

  const handleToggleTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light')
      localStorage.theme = 'light'
      console.log('changed to light')
    } else {
      setTheme('dark')
      localStorage.theme = 'dark'
      console.log('changed to dark')
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 dark:text-slate-50 h-screen">
      <div className="nav">
        <h3>Geo Explorer</h3>
        <Link to='/login'>log in</Link>
        <Link to='/register'>Register</Link>
        <button onClick={handleToggleTheme} aria-label="dark mode toggle">
          <FontAwesomeIcon icon={faMoon} />
        </button>
        {theme === 'dark' && 'is dark mode'}
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar