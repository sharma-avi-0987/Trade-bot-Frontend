import React from 'react'

function SymbolDetailCard({ data }) {
  const { symbol, price, change, volume } = data

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border dark:border-gray-700">
      <h3 className="text-lg font-semibold">{symbol}</h3>
      <p className="text-gray-500 dark:text-gray-300">Price: ₹{price}</p>
      <p className={`font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        Change: {change}%
      </p>
      <p className="text-sm text-gray-400">Volume: {volume}</p>
    </div>
  )
}

export default SymbolDetailCard
