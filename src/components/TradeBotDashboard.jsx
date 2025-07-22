import React, { useState } from 'react';

const sampleStocks = [
  { name: 'Reliance', symbol: 'RELIANCE', change: 4.2, price: 2850.75, volume: '2.5M', open: 2805.50, high: 2872.30, low: 2798.20 },
  { name: 'TCS', symbol: 'TCS', change: -2.1, price: 3821.50, volume: '1.8M', open: 3902.75, high: 3910.40, low: 3805.60 },
  { name: 'Infosys', symbol: 'INFY', change: 5.7, price: 1542.30, volume: '3.2M', open: 1460.80, high: 1555.90, low: 1458.30 },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', change: -3.4, price: 1628.90, volume: '1.2M', open: 1685.40, high: 1690.20, low: 1620.50 },
  { name: 'Adani Power', symbol: 'ADANIPOWER', change: 7.8, price: 423.45, volume: '4.5M', open: 392.80, high: 430.90, low: 390.25 },
  { name: 'Zomato', symbol: 'ZOMATO', change: -4.3, price: 132.60, volume: '5.7M', open: 138.50, high: 139.80, low: 130.40 },
  { name: 'Tata Steel', symbol: 'TATASTEEL', change: 0.2, price: 145.80, volume: '2.1M', open: 145.50, high: 147.90, low: 143.20 },
  { name: 'Vedanta', symbol: 'VEDL', change: -0.1, price: 342.25, volume: '1.9M', open: 343.00, high: 345.80, low: 338.40 },
  { name: 'Paytm', symbol: 'PAYTM', change: 6.5, price: 865.40, volume: '3.8M', open: 812.50, high: 872.90, low: 810.30 },
  { name: 'Wipro', symbol: 'WIPRO', change: -5.6, price: 482.35, volume: '2.3M', open: 510.80, high: 512.40, low: 480.20 },
];

const getTopGainers = () =>
  sampleStocks
    .filter(s => s.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);

const getTopLosers = () =>
  sampleStocks
    .filter(s => s.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);

const getVolatile = () =>
  sampleStocks
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 5);

const TradeBotDashboard = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [botStatus, setBotStatus] = useState('stopped');
  const [strategy, setStrategy] = useState('mean_reversion');

  const filteredData = sampleStocks.filter(
    stock =>
      stock.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'All' ||
        (filter === 'Gainers' && stock.change > 0) ||
        (filter === 'Losers' && stock.change < 0))
  );

  const addToWatchlist = (stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
  };

  const placeOrder = () => {
    if (!selectedStock) return;
    alert(`Order placed: ${orderType} ${quantity} shares of ${selectedStock.name} at ${orderType === 'market' ? 'market price' : '₹' + price}`);
    setSelectedStock(null);
  };

  const toggleBot = () => {
    setBotStatus(botStatus === 'stopped' ? 'running' : 'stopped');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="ml-2 text-xl font-bold">TradeBot Pro</h1>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${botStatus === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {botStatus === 'running' ? 'ACTIVE' : 'STOPPED'}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleBot}
              className={`px-4 py-2 rounded-md font-medium ${botStatus === 'running' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
            >
              {botStatus === 'running' ? 'Stop Bot' : 'Start Bot'}
            </button>
            <div className="relative">
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="mean_reversion">Mean Reversion</option>
                <option value="momentum">Momentum</option>
                <option value="breakout">Breakout</option>
                <option value="arbitrage">Arbitrage</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-800 text-white font-medium flex justify-between items-center">
              <h2>Watchlist</h2>
              <span className="text-xs bg-gray-600 rounded-full px-2 py-1">{watchlist.length} items</span>
            </div>
            <div className="divide-y divide-gray-200">
              {watchlist.length > 0 ? (
                watchlist.map((stock, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-gray-50 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">₹{stock.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </span>
                      <button 
                        onClick={() => removeFromWatchlist(stock.symbol)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="mt-2 text-sm">Your watchlist is empty</p>
                  <p className="text-xs">Add stocks to monitor them here</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-800 text-white font-medium">Quick Order</div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="text"
                  placeholder="Search symbol..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option>Market</option>
                  <option>Limit</option>
                  <option>SL</option>
                  <option>SL-M</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    defaultValue="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Market"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500">
                  Buy
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search stocks by name or symbol..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                >
                  <option value="All">All Stocks</option>
                  <option value="Gainers">Gainers Only</option>
                  <option value="Losers">Losers Only</option>
                </select>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-800 text-white font-medium">Market Overview</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-500">Nifty 50</div>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-gray-900">18,245.30</span>
                  <span className="ml-2 text-xs font-medium text-green-600">+0.8%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-500">Sensex</div>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-gray-900">61,328.45</span>
                  <span className="ml-2 text-xs font-medium text-red-600">-0.3%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-500">Advances</div>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-gray-900">1,245</span>
                  <span className="ml-2 text-xs font-medium text-green-600">62%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-500">Declines</div>
                <div className="flex items-baseline mt-1">
                  <span className="text-xl font-bold text-gray-900">765</span>
                  <span className="ml-2 text-xs font-medium text-red-600">38%</span>
                </div>
              </div>
            </div>
          </div>


          <div className="space-y-6">
            <StockSection 
              title="Top Gainers" 
              data={getTopGainers()} 
              action={addToWatchlist}
              onSelect={setSelectedStock}
            />
            <StockSection 
              title="Top Losers" 
              data={getTopLosers()} 
              action={addToWatchlist}
              onSelect={setSelectedStock}
            />
            <StockSection 
              title="Most Volatile" 
              data={getVolatile()} 
              action={addToWatchlist}
              onSelect={setSelectedStock}
            />
          </div>
        </div>


        {selectedStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Place Order</h3>
                <button 
                  onClick={() => setSelectedStock(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Stock</span>
                  <span className="font-medium">{selectedStock.name} ({selectedStock.symbol})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Current Price</span>
                  <span className="font-medium">₹{selectedStock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Change</span>
                  <span className={`font-medium ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%
                  </span>
                </div>

                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                      <option value="sl">Stop Loss</option>
                      <option value="slm">Stop Loss Market</option>
                    </select>
                  </div>

                  {orderType !== 'market' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter price"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedStock(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  onClick={placeOrder}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StockSection = ({ title, data, action, onSelect }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <button className="text-sm text-green-600 hover:text-green-800">
        View all
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((stock, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{stock.symbol}</div>
                <div className="text-sm text-gray-500">{stock.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{stock.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock.volume}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                  onClick={() => action(stock)}
                  className="text-green-600 hover:text-green-900"
                >
                  Watch
                </button>
                <button 
                  onClick={() => onSelect(stock)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Trade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


export default TradeBotDashboard;



