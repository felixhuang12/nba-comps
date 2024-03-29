import React from 'react'
import './App.css'
import { Box } from '@mui/material'
import Login from './components/Login'
import Notification from './components/Notification'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Registration from './components/Registration'
import Home from './components/Home'
import SelectStats from './components/SelectStats'

const App = () => {
    return (
        <Box>
            <Header bg={"#DCDCDC"} />
            <Notification />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/home" element={<Home />} />
                <Route path="/selectstats" element={<SelectStats />} />
            </Routes>
        </Box>
    )
}

export default App
