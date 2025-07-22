import React from "react";
import DataCard from "./DataCard";

export const dummyTopGainers = {
  page: 1,
  limit: 10,
  total: 16,
  result: [
    {
      symbol: "USDNOK",
      price: 10.1844,
      change: "+0.02902",
      percent: "+0.29%",
      absolute_percent: 0.29,
      status: "up",
      logo: [
        "https://flagcdn.com/w80/usd.png",
        "https://flagcdn.com/w80/nok.png"
      ]
    },
    {
      symbol: "USDSEK",
      price: 9.59056,
      change: "+0.02396",
      percent: "+0.25%",
      absolute_percent: 0.25,
      status: "up",
      logo: [
        "https://flagcdn.com/w80/usd.png",
        "https://flagcdn.com/w80/sek.png"
      ]
    },
    {
      symbol: "BTCUSD",
      price: 117548.13,
      change: "+266.24",
      percent: "+0.23%",
      absolute_percent: 0.23,
      status: "up",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
    },
  ],
};

export const dummyTopLosers = {
  page: 1,
  limit: 10,
  total: 16,
  result: [
    {
      symbol: "USDTRY",
      price: 23.4567,
      change: "-0.0345",
      percent: "-0.15%",
      absolute_percent: 0.15,
      status: "down",
      logo: [
        "https://flagcdn.com/w80/usd.png",
        "https://flagcdn.com/w80/try.png"
      ]
    },
    {
      symbol: "EURGBP",
      price: 0.85012,
      change: "-0.0023",
      percent: "-0.27%",
      absolute_percent: 0.27,
      status: "down",
      logo: [
        "https://flagcdn.com/w80/eur.png",
        "https://flagcdn.com/w80/gbp.png"
      ]
    },
    {
      symbol: "LTCUSD",
      price: 85.34,
      change: "-1.23",
      percent: "-1.42%",
      absolute_percent: 1.42,
      status: "down",
      logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.png"
    },
  ],
};

export const dummyVolatile = {
  page: 1,
  limit: 10,
  total: 16,
  result: [
    {
      symbol: "ETHUSD",
      price: 1800.12,
      change: "+25.32",
      percent: "+1.42%",
      absolute_percent: 1.42,
      status: "up",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    },
    {
      symbol: "XRPUSD",
      price: 0.6543,
      change: "-0.0456",
      percent: "-6.53%",
      absolute_percent: 6.53,
      status: "down",
      logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png"
    },
    {
      symbol: "USDZAR",
      price: 18.43,
      change: "+0.27",
      percent: "+1.48%",
      absolute_percent: 1.48,
      status: "up",
      logo: [
        "https://flagcdn.com/w80/usd.png",
        "https://flagcdn.com/w80/zar.png"
      ]
    },
  ],
};

const TopMoversSection = () => {
  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-green-700 mb-4">🚀 Top Gainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyTopGainers.result.map((item) => (
            <DataCard key={item.symbol} data={item} market="gainers" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-red-700 mb-4">📉 Top Losers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyTopLosers.result.map((item) => (
            <DataCard key={item.symbol} data={item} market="losers" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">⚡ Volatile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyVolatile.result.map((item) => (
            <DataCard key={item.symbol} data={item} market="volatile" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopMoversSection;
