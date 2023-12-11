import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/user.context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [theme, setTheme] = useState()

  const { logoutUser } = useContext(UserContext)

  const logout = async () => {
    try {
      const loggedOut = await logoutUser()
      if (loggedOut) {
        window.location.reload(true)
      } 
    } catch (error) {
      alert(error)
    }
  }

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
    <div className="bg-slate-50 dark:bg-slate-900 dark:text-slate-50 h-screen flex flex-col justify-between">
      <div className="nav flex justify-between p-4 border-b-2  dark:border-b-slate-50 border-b-slate-900 fixed w-full bg-slate-50 dark:bg-slate-900">
        <div>
          <h3>Geo Explorer</h3>
        </div>
        <div className='flex gap-4'>
          <Link to='/login'>Log in</Link>
          <Link to='/register'>Register</Link>
          <button onClick={logout}>Log out</button>
          <button onClick={handleToggleTheme} aria-label="dark mode toggle">
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
      <div className='pt-12 h-full flex flex-col justify-center font-content'>
        <Outlet />
      </div>
      <div className='border-t-2 dark:border-t-slate-50 border-t-slate-900 px-4 py-2 text-sm'>
        Miles Eng
      </div>
    </div>
  )
}

export default Navbar