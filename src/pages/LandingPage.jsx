import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/LandingPage/Hero'
import FeatureSection from '../components/LandingPage/FeatureSection'
import Footer from '../components/common/Footer'
import LoginCard from '../components/authcards/LoginCard'
import { useNavigate } from 'react-router-dom'

function LandingPage({ isLoggedIn, setIsLoggedIn }) {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setShowLogin(false)
    navigate('/dashboard')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin && (
        <LoginCard
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <Hero />
      <FeatureSection />
      <Footer />
    </div>
  )
}

export default LandingPage
