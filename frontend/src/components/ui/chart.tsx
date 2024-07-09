"use client";
import React from "react";
import { StockChart } from "@/components/ui/stock-chart";
import { StockChartHeader } from "@/components/ui/stock-chart-header";

export interface StockData {
  ticker?: string;
  queryCount?: number;
  resultsCount?: number;
  adjusted?: boolean;
  results: StockResult[];
  count?: number;
}

interface StockResult {
  v: number; // volume of stocks traded
  vw: number; // volume weighted average price
  o: number; // open price
  c: number; // close price
  h: number; // high price
  l: number; // low price
  t: number; // timestamp
  n: number;
}

export function Chart({ stockData }: { stockData: StockData }) {
  const currencySymbol = stockData.ticker ? "$" : "₹";

  // Sort stockData.results in descending order based on timestamp
  const sortedData = stockData.results.sort((a, b) => new Date(a.t).getTime() - new Date(b.t).getTime());

  return (
    console.log('currencySymbol', currencySymbol),
    <div>
      <StockChartHeader stockData={stockData} currencySymbol={currencySymbol} />
      <StockChart
        data={sortedData.map((result) => ({
          date: formatDate(result.t),
          close: result.c,
        }))}
        currencySymbol={currencySymbol}
      />
    </div>
  );
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}
