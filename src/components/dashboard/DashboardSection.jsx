import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataCard from "./DataCard";

const DashboardSection = () => {
  const [nseData, setNseData] = useState([]);
  const [forexData, setForexData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.getDashboard();
        setNseData(res.nse || []);
        setForexData(res.forex || []);
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📈 NSE Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nseData.map((item) => (
            <DataCard key={item.symbol || item.id || Math.random()} data={item} market="nse" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🌍 Forex Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forexData.map((item) => (
            <DataCard key={item.symbol || item.id || Math.random()} data={item} market="forex" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardSection;
