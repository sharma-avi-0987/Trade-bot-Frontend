const BASE_URL = import.meta.env.VITE_API_URL;

const api = {
  // Dashboard Combined
  getDashboard: async (nsePage = 1, forexPage = 1, size = 10, nseFilter = "all", forexFilter = "all") => {
    const res = await fetch(`${BASE_URL}/dashboard?nse_page=${nsePage}&forex_page=${forexPage}&size=${size}&nse_filter=${nseFilter}&forex_filter=${forexFilter}`);
    if (!res.ok) throw new Error("Dashboard fetch failed");
    return res.json();
  },

  // Market Overview
  getForexOverview: (page = 1, size = 10, filter = "all") =>
    fetch(`${BASE_URL}/forex/dashboard?page=${page}&size=${size}&filter=${filter}`).then(res => res.json()),

  getNseOverview: (page = 1, size = 10, filter = "all") =>
    fetch(`${BASE_URL}/nse/dashboard?page=${page}&size=${size}&filter=${filter}`).then(res => res.json()),

  // Symbol Live Data
  getSymbolLiveData: (symbol, market) =>
    fetch(`${BASE_URL}/${market}/data/${symbol}`).then(res => res.json()),

  // Place Order
  placeManualOrder: async (symbol, market, action, quantity) => {
    const res = await fetch(`${BASE_URL}/api/order/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, market, action, quantity })
    });
    if (!res.ok) throw new Error("Order failed");
    return res.json();
  },

  // Strategy - Predefined
  applyPredefinedStrategy: async (payload, mode = "past") => {
    const res = await fetch(`${BASE_URL}/api/strategy/apply/predefined?mode=${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  listPredefinedStrategies: () =>
    fetch(`${BASE_URL}/api/strategy/predefined/list`).then(res => res.json()),

  searchPredefinedStrategies: (query) =>
    fetch(`${BASE_URL}/api/strategy/predefined/search?query=${query}`).then(res => res.json()),

  // Strategy - Custom
  applyCustomStrategy: async (payload, mode = "past") => {
    const res = await fetch(`${BASE_URL}/api/strategy/apply/custom?mode=${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  listSavedStrategies: () =>
    fetch(`${BASE_URL}/api/strategy/custom/list`).then(res => res.json()),

  deleteSavedStrategy: (name) =>
    fetch(`${BASE_URL}/api/strategy/custom/${name}`, {
      method: "DELETE"
    }).then(res => res.json()),

  updateSavedStrategy: (name, strategy) =>
    fetch(`${BASE_URL}/api/strategy/custom/${name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(strategy)
    }).then(res => res.json()),

  searchSavedStrategies: (query) =>
    fetch(`${BASE_URL}/api/strategy/custom/search?query=${query}`).then(res => res.json()),

  // Symbols
  getSymbols: (market) =>
    fetch(`${BASE_URL}/symbols/${market}`).then(res => res.json()),

  searchSymbols: (query, market = "all") =>
    fetch(`${BASE_URL}/symbols/search?q=${query}&market=${market}`).then(res => res.json()),

  // Wishlist
  addToWishlist: async (symbol, market) => {
    const res = await fetch(`${BASE_URL}/wishlist/wishlist/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, market })
    });
    return res.json();
  },

  removeFromWishlist: async (symbol, market) => {
    const res = await fetch(`${BASE_URL}/wishlist/wishlist/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, market })
    });
    return res.json();
  },

  getWishlist: (market = "all") =>
    fetch(`${BASE_URL}/wishlist/wishlist?market=${market}`).then(res => res.json()),
};

export default api;
