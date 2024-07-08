import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAggregates, getFinancials, getNews, getTickerSnapshot } from "@/lib/polygon";
import { getUpAggregates} from "@/lib/upstox";
// import {ZerodhaClient} from '@/lib/zerodha'

export const tools = [
  new DynamicStructuredTool({
    name: "getFinancials",
    description: "Retrieves financial data for a given stock ticker.",
    schema: z.object({
      ticker: z.string().describe("The stock ticker symbol"),
    }),
    func: async ({ ticker }) => {
      const data = await getFinancials(ticker);
      return JSON.stringify(data);
    },
  }),
  new DynamicStructuredTool({
    name: "getNews",
    description: "Retrieves news articles for a given stock ticker. Use this information to answer concisely",
    schema: z.object({
      ticker: z.string().describe("The stock ticker symbol"),
    }),
    func: async ({ ticker }) => {
      const data = await getNews(ticker);
      return JSON.stringify(data);
    },
  }),

  new DynamicStructuredTool({
    name: "getStockPriceHistory",
    description: "Retrieves historical stock price data for a given stock ticker over a specified time period.",
    schema: z.object({
      ticker: z.string().describe("The stock ticker symbol"),
      from: z.string().describe("The start date for the stock price data"),
      to: z.string().describe("The end date for the stock price data"),
    }),
    func: async ({ ticker, from, to }) => {
      const data = await getAggregates(ticker, from, to);
      return JSON.stringify(data);
    },
  }),


  new DynamicStructuredTool({
    name: "getUpStockPriceHistory",
    description: "Retrieves historical stock price data for a given stock ticker over a specified time period from the upstox tool, to_date must be greater than or equal to from_date and Date should be in valid format: yyyy-mm-dd",
    schema: z.object({
      ticker: z.string().describe("The stock ticker symbol in the ISIN code example 'BSE_EQ|INE002A01018' "),
      interval: z.string().describe("The stock interval 1minute, day, week, month, year"),
      to: z.string().describe("The end date for the stock price data"),
      from: z.string().describe("The start date for the stock price data "),
    }),
    func: async ({ ticker,interval, from, to }) => {
      const data = await getUpAggregates(ticker, interval , to,from);
      return JSON.stringify(data);
    },
  }),


  new DynamicStructuredTool({
    name: "getLatestPrice",
    description: "Retrieves the latest price for a given stock ticker.",
    schema: z.object({
      ticker: z.string().describe("The stock ticker symbol"),
    }),
    func: async ({ ticker}) => {
      const data = await getTickerSnapshot(ticker);
      return JSON.stringify(data);
    },
  }),


  // import { z } from 'zod';

  // new DynamicStructuredTool({
  //   name: "generateKitePublisherBuyButton",
  //   description: "Generates HTML and JavaScript code to place a buy order for a specified stock using the Kite Publisher JavaScript plugin.",
  //   schema: z.object({
  //     apiKey: z.string().describe("Your Kite Publisher API key"),
  //     ticker: z.string().describe("The stock ticker symbol, e.g., 'SBIN'"),
  //     exchange: z.string().describe("The stock exchange, e.g., 'NSE'"),
  //     orderType: z.string().describe("The order type, e.g., 'MARKET', 'LIMIT'"),
  //     quantity: z.number().describe("The number of shares to buy"),
  //     price: z.number().optional().describe("The price for LIMIT orders, optional for MARKET orders"),
  //   }),
  //   func: async ({ apiKey, ticker, exchange, orderType, quantity, price }) => {
  //     const priceAttribute = orderType === 'LIMIT' ? ` data-price="${price}"` : '';
      
  //     const htmlSnippet = `
  // <!-- Include Kite Publisher script -->
  // <script src="https://kite.trade/publisher.js?v=3"></script>
  
  // <!-- Buy button for ${ticker} -->
  // <kite-button
  //   href="#"
  //   data-kite="${apiKey}"
  //   data-exchange="${exchange}"
  //   data-tradingsymbol="${ticker}"
  //   data-transaction_type="BUY"
  //   data-quantity="${quantity}"
  //   data-order_type="${orderType}"${priceAttribute}>
  //   Buy ${ticker} stock
  // </kite-button>
  // `;
  
  //     return htmlSnippet;
  //   },
  // });

];

