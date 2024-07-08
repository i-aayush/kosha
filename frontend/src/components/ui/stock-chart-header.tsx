import React from "react";
import { Green, Pink } from "@/styles/colors";
import { StockData } from "@/components/ui/chart";

interface StockChartHeaderProps {
  stockData: StockData;
  currencySymbol: string; // New prop for currency symbol
}

export const StockChartHeader: React.FC<StockChartHeaderProps> = ({
  stockData,
  currencySymbol,
}) => {
  // Compute percent and currency difference between end price and start price
  const prices = stockData.results;
  const startPrice = prices[0].c;
  const endPrice = prices[prices.length - 1].c;
  const percentDifference = ((endPrice - startPrice) / startPrice) * 100;
  const currencyDifference = endPrice - startPrice;

  return (
    <div>
      <div style={{ fontSize: "28px" }}>
        {stockData.ticker}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {currencySymbol}{prices[prices.length - 1].c.toFixed(2)}
      </div>
      <div style={{ fontSize: "12px", fontWeight: "bold", display: "flex" }}>
        <div style={{ marginRight: "8px" }}>
          {currencyDifference > 0 ? (
            <span style={{ color: Green }}>+{currencySymbol}{currencyDifference.toFixed(2)}</span>
          ) : (
            <span style={{ color: Pink }}>-{currencySymbol}{Math.abs(currencyDifference).toFixed(2)}</span>
          )}
        </div>
        <div>
          {percentDifference > 0 ? (
            <span style={{ color: Green }}>(+{percentDifference.toFixed(2)}%)</span>
          ) : (
            <span style={{ color: Pink }}>({percentDifference.toFixed(2)}%)</span>
          )}
        </div>
      </div>
    </div>
  );
};
