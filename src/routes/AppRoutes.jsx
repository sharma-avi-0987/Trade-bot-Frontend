import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import DashboardPage from '../pages/DashboardPage'

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
    </Routes>
  )
}

export default AppRoutes
