import React from "react";

const DataCard = ({ data, market }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-700">
        {data.symbol || data.name}
      </h3>

      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Price:</span> ₹{data.price || data.ltp}</p>
        <p>
          <span className="font-medium">Change:</span>{" "}
          <span className={data.change > 0 ? "text-green-600" : "text-red-600"}>
            {data.change} ({data.change_percent || data.percent_change}%)
          </span>
        </p>
        <p><span className="font-medium">Volume:</span> {data.volume || data.vol}</p>
        <p><span className="font-medium">Market:</span> {market.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default DataCard;
