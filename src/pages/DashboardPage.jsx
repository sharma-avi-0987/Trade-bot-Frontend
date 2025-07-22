import React from "react";
import DashboardSection from "../components/Dashboard/DashboardSection";
import MarketSection from "../components/Market/MarketSection";
import TopMoversSection from "../components/dashboard/TopMoversSection ";

const DashboardPage = () => {
  return (
    <div className="space-y-12 p-4 bg-gray-50 min-h-screen">
      <DashboardSection />
      <TopMoversSection />
      <MarketSection />
    </div>
  );
};

export default DashboardPage;
