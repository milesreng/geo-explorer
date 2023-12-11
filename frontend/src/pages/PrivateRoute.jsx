import React from 'react'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'
import Navbar from '../components/Navbar'

const PrivateRoute = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`

  return !user ? <Navigate to={redirectLoginUrl} /> : <Navbar />
}

export default PrivateRoute