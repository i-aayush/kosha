const UpstoxClient = require('upstox-js-sdk');

interface StockData {
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
  n: number; // number of trades
}

async function getUpAggregates(instrumentKey: string, interval: string, toDate: string, fromDate: string, apiVersion = "v1"): Promise<StockData[]> {
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
            results: [data.data.candles.map((item: any[]) => ({
              t: item[0],
              o: item[1],
              h: item[2],
              l: item[3],
              c: item[4],
              v: item[5],
              vw: item[6], // Assuming 'unknown' maps to 'vw'
              n: 0, // Placeholder as 'n' is not provided in the initial data structure
            }))]
          };
          resolve([formattedData]); // Wrapping in an array to match the expected return type
        } else {
          console.error("Unexpected data format received from API:", data);
          reject(new TypeError("Unexpected data format received from API"));
        }
      }
    });
  });
}

module.exports = { getUpAggregates};

async function testGetUpstoxMarketData() {
  try {
    const ticker = 'BSE_EQ|INE002A01018'; // Replace with actual instrument key
    const interval = '1minute'; // Example interval
    const toDate = "2024-06-01"; // Example end date
    const fromDate = '2024-05-31'; // Example start date

    const data = await getUpAggregates(ticker, interval, toDate, fromDate);
    console.log('Data fetched successfully:', data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

testGetUpstoxMarketData();


