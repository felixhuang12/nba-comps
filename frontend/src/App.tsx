import React from 'react'
import './App.css'
import { Box } from '@mui/material'
import Login from './components/Login'
import Notification from './components/Notification'
import { useStateValue } from './state/state'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Registration from './components/Registration'
import Home from './components/Home'

const App = () => {
  const [state, ] = useStateValue()
  
  console.log(state)

  return (
      <Box>
          <Header bg={"#DCDCDC"} />
          <Notification />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<Home />} />
          </Routes>
      </Box>
  )
}

export default App
