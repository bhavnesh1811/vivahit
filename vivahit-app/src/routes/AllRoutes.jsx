import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Wallet from '../pages/Wallet'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/wallet' element={<Wallet/>} />
    </Routes>
  )
}

export default AllRoutes