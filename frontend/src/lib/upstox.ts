"use server";
import axios from 'axios';
import { StockData } from "@/components/ui/chart";
const UpstoxClient = require('upstox-js-sdk');

export interface HistoricalStockData {
  date: string; // Date: The date of the time interval.
  open: number; // Open: The price at the beginning of the time interval.
  high: number; // High: The highest price during the time interval.
  low: number; // Low: The lowest price during the time interval.
  close: number; // Close: The price at the end of the time interval.
  volume: number; // Volume: The number of shares or contracts traded during the time interval.
  unknown: number; 
}

async function getUpAggregates(instrumentKey: string, interval: string, toDate: string, fromDate: string, apiVersion = "v1"): Promise<StockData> {
  let apiInstance = new UpstoxClient.HistoryApi();

  return new Promise((resolve, reject) => {
    apiInstance.getHistoricalCandleData1(instrumentKey, interval, toDate, fromDate, apiVersion, (error: any, data: any, response: any) => {
      if (error) {
        console.error("An error occurred while fetching market data:", error);
        reject(error);
      } else {
        console.log('API called successfully. Returned data: ', data);
        // Assuming data has a candles property that is an array
        if (data) {
          const formattedData: StockData = {
            results: data.data.candles.map((item: any) => ({
              t: item[0],
              o: item[1],
              h: item[2],
              l: item[3],
              c: item[4],
              v: item[5],
              vw: item[6], // Assuming 'unknown' maps to 'vw'
              n: 0, // Placeholder as 'n' is not provided in the initial data structure
            }))
          };
          resolve(formattedData); // Wrapping in an array to match the expected return type
        } else {
          console.error("Unexpected data format received from API:", data);
          reject(new TypeError("Unexpected data format received from API"));
        }
      }
    });
  });
}

export { getUpAggregates };

