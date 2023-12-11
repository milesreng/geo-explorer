import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/user.context.jsx'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    loadUser()
  }, [])

  const handleFormInputChange = (event) => {
    const { name, value } = event.target
    setForm({ ... form, [name]: value })

    console.log(form)
  }

  const redirectNow =() => {
    const redirectTo = location.search.replace('?redirectTo=', '')
    navigate(redirectTo ? redirectTo : '/')
  }

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser()
      if (fetchedUser) {
        redirectNow()
      }
    }
  }

  const handleSubmit = async (event) => {
    try {
      const user = await emailPasswordLogin(form.email, form.password)
      if (user) {
        redirectNow()
      }
    } catch (error) {
      if (error.statusCode === 401) {
        alert('Invalid email/password, try again.')
      } else {
        alert(error)
      }
    }
  }

  return (
    <div className='w-[420px] md:w-[512px] m-auto bg-slate-200 dark:bg-slate-700 shadow-lg px-12 py-4'>
      <h1 className='text-4xl uppercase text-center p-2 font-display'>Sign In</h1>
      <form className=' w-full align-middle font-content'
        action=''>
        <div className="w-full flex flex-col gap-4 align-middle ">
          <input type='text'
            required
            aria-label='email'
            value={form.email} 
            name='email' 
            placeholder='email'
            onChange={handleFormInputChange}
            className='shadow-md w-11/12 md:w-2/3 rounded-sm m-auto p-1' />
          <input type="password"
            required
            aria-label='password'
            value={form.password}
            name='password'
            placeholder='password'
            onChange={handleFormInputChange}
            className='shadow-md w-11/12 md:w-2/3 rounded-sm m-auto p-1' />
        </div>
        <button onClick={handleSubmit}
          className=''>
            log in
        </button>
      </form>
      <p className='relative flex items-center gap-2 py-4'>
        <div className='flex-grow border-t border-slate-400'></div>
        <span className='flex-shrink only:px-8 text-slate-400'>or</span>
        <div className='flex-grow border-t border-slate-400'></div>
      </p>
      <button>
        <Link to='/register'>
          Register
        </Link>
      </button>
    </div>
  )
}

export default Login