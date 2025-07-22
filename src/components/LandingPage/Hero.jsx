import { motion } from 'framer-motion'
import heroImage from '../../assets/hero.jpg'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={heroImage}
          alt="Trading Analytics"
          className="w-full h-full object-cover"
        />
        <motion.div className="absolute inset-0 z-0">
  <img src={heroImage} alt="Trading Analytics" className="w-full h-full object-cover" />
  <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
</motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }}
        viewport={{ once: true }}
        className="z-20 text-center max-w-4xl px-4 text-white"
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">AI-Powered</span> Trading Revolution
        </motion.h1>
        
        <motion.p
          className="mt-8 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Outperform the markets with our intelligent trading system that adapts in real-time to changing market conditions.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-medium text-sm md:text-base hover:scale-105">
            Get Started Now
          </button>
          <button className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300 font-medium text-sm md:text-base">
            How It Works
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="animate-bounce w-8 h-8 border-4 border-white/50 rounded-full border-t-transparent"></div>
      </motion.div>
    </section>
  )
}

export default HeroSection