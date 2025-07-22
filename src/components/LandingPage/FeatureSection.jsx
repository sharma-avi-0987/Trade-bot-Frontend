import { motion } from 'framer-motion'
import Magnet from './Magnet'

const features = [
  {
    title: "Real-time Market Insights",
    description: "Stay ahead with up-to-the-minute market analysis and signals to make smarter trading decisions.",
    icon: "📊",
    color: "from-blue-100 to-blue-50",
    borderColor: "border-blue-200"
  },
  {
    title: "Automated Strategy Execution",
    description: "Let the bot do the work—execute trades based on your configured strategy without lifting a finger.",
    icon: "🤖",
    color: "from-purple-100 to-purple-50",
    borderColor: "border-purple-200"
  },
  {
    title: "Risk Management Tools",
    description: "Integrated stop-loss, take-profit, and trailing stop features to protect your portfolio.",
    icon: "🛡️",
    color: "from-green-100 to-green-50",
    borderColor: "border-green-200"
  },
]

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className={`flex flex-col p-8 rounded-2xl border bg-gradient-to-br ${feature.color} ${feature.borderColor} shadow-sm hover:shadow-md transition-all duration-300 h-full`}
    >
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
          className="text-5xl mr-4"
        >
          {feature.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
      </div>
      <p className="text-gray-600 text-md">{feature.description}</p>
      <motion.div
        whileHover={{ x: 5 }}
        className="mt-6 flex items-center text-blue-600 font-medium cursor-pointer"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function FeatureSection() {
  return (
    <section className="relative bg-gray-50 text-gray-800 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-50" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Power-packed Features for Smart Traders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our trading bot gives you the tools and automation you need to stay competitive, reduce risk, and maximize returns.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Magnet padding={100} magnetStrength={5}>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
          </Magnet>
          <p className="mt-4 text-gray-500 text-sm">No credit card required</p>
        </motion.div>
      </div>
    </section>
  )
}
