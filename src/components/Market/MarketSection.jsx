import React, { useEffect, useState } from "react";

const MarketSection = () => {
  const [mostBought, setMostBought] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const boughtRes = await fetch(
          `${import.meta.env.VITE_API_URL}/test/most_bought_pairs_dashboard`
        );
        const soldRes = await fetch(
          `${import.meta.env.VITE_API_URL}/test/most_sold_pairs_dashboard`
        );
        const boughtData = await boughtRes.json();
        const soldData = await soldRes.json();

        setMostBought(boughtData.results?.results || []);
        setMostSold(soldData.results?.results || []);
      } catch (error) {
        console.error("Market data fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading)
    return (
      <div className="text-center p-6 text-gray-500">Loading Market Data...</div>
    );

  const renderCard = (data, color) => (
    <div key={data.symbol} className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold">{data.symbol}</h3>
      <p className="text-sm text-gray-600">
        Buy Volume:{" "}
        <span className={`font-medium text-${color}-600`}>
          {typeof data.buy_volume === "number"
            ? data.buy_volume.toFixed(2)
            : "N/A"}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        Sell Volume:{" "}
        <span className={`font-medium text-${color === "green" ? "red" : "green"}-600`}>
          {typeof data.sell_volume === "number"
            ? data.sell_volume.toFixed(2)
            : "N/A"}
        </span>
      </p>
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-green-700 mb-4">🟢 Most Bought Pairs</h2>
        {mostBought.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostBought.map((pair) => renderCard(pair, "green"))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-red-700 mb-4">🔴 Most Sold Pairs</h2>
        {mostSold.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostSold.map((pair) => renderCard(pair, "red"))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MarketSection;
