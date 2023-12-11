import React from 'react'
import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { emailPasswordSignup } = useContext(UserContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleFormInputChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const redirectNow =() => {
    const redirectTo = location.search.replace('?redirectTo=', '')
    navigate(redirectTo ? redirectTo : '/')
  }

  const handleSubmit = async (event) => {
    try {
      const user = await emailPasswordSignup(form.email, form.password)
      if (user) {
        redirectNow()
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='w-3/4 md:1-2 lg:w-1/3 m-auto bg-slate-200 dark:bg-slate-700 shadow-lg px-12 py-4'>
      <h1 className='text-xl font-bold uppercase text-center p-2'>Register</h1>
      <form className='flex flex-col gap-4 w-full' action=''>
        <div className='w-full flex justify-between px-2'>
          <label htmlFor="email" className='w-1/4 capitalize'>email</label>
          <input type='text'
            required
            aria-label='email'
            value={form.email} 
            name='email' 
            onChange={handleFormInputChange}
            className='shadow-md w-8/12 rounded-sm' />
        </div>
        <div className='w-full flex justify-between px-2'>
          <label htmlFor="password" className='w-1/4 capitalize'>password</label>
          <input type="password"
            required
            aria-label='password'
            value={form.password}
            name='password'
            onChange={handleFormInputChange}
            className='shadow-md w-8/12 rounded-sm'  />
        </div>
        <button onClick={handleSubmit}
          className='capitalize bg-slate-400 w-1/3 m-auto rounded-md text-slate-50 hover:bg-slate-500 transition-all duration-100'>
            Register
        </button>
      </form>
    </div>
  )
}

export default Register