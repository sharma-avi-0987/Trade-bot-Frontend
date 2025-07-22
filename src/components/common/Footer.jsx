import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Newsletter section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Stay Updated With TradeBot
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Join our newsletter for the latest trading insights and platform updates.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white px-6 py-3 rounded-full w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            />
            <motion.button
              type="submit"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>

          <AnimatePresence>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-sm mt-2"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </AnimatePresence>
        </div>


        <div className="flex justify-center gap-6 mb-8 text-2xl">
          <motion.a 
            href="#" 
            className="hover:text-blue-400 transition-all" 
            whileHover={{ y: -3 }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-blue-400 transition-all"
            whileHover={{ y: -3 }}
          >
            <FaTwitter />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-blue-500 transition-all"
            whileHover={{ y: -3 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-pink-500 transition-all"
            whileHover={{ y: -3 }}
          >
            <FaInstagram />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-red-500 transition-all"
            whileHover={{ y: -3 }}
          >
            <FaYoutube />
          </motion.a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} TradeBot. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all z-50"
      >
        <FaArrowUp />
      </motion.button>
    </div>
  )
}

export default Footer