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
    <div>
      <form action=''>
        <input type='text'
          aria-label='email'
          value={form.email} 
          name='email' 
          onChange={handleFormInputChange} />
        <input type="password"
          aria-label='password'
          value={form.password}
          name='password'
          onChange={handleFormInputChange} />
        <button onClick={handleSubmit}>signup</button>
      </form>
    </div>
  )
}

export default Register