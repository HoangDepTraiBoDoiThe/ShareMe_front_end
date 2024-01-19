import React, {useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './container/Home'
import Login from './components/login'
import { FetchUserLocalStore } from './utils/FetchUser'

const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = FetchUserLocalStore()
    if (user)
    {
      navigate('/')
    }
    else {
      navigate('/login')
    }
  }, [])
  
  return (
    <Routes>
      <Route path = "login" element = {<Login />} />
      <Route path = "/*" element = {<Home />} />
    </Routes>
  )
}

export default App
