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
        <button onClick={handleSubmit}>log in</button>
      </form>
      <p>Don&apos;t have an account? <Link to='/register'>Sign up here.</Link></p>
    </div>
  )
}

export default Login