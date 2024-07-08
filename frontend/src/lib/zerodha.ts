import { KiteConnect } from "kiteconnect";

const apiKey = "2x9mia3glorffrud";
const apiSecret = "nbisq23ybkckjjmyppgbplw9w3jkv71v";
const requestToken = "your_request_token";

export interface KitePublisherButtonParams {
    apiKey: string;
    ticker: string;
    exchange: string;
    orderType: string;
    quantity: number;
    price?: number;
  }
  
  export function generateKitePublisherButton(params: KitePublisherButtonParams): string {
    const { apiKey, ticker, exchange, orderType, quantity, price } = params;
    const priceAttribute = orderType === 'LIMIT' ? ` data-price="${price}"` : '';
  
    const htmlSnippet = `
  <!-- Include Kite Publisher script -->
  <script src="https://kite.trade/publisher.js?v=3"></script>
  
  <!-- Buy button for ${ticker} -->
  <kite-button
    href="#"
    data-kite="${apiKey}"
    data-exchange="${exchange}"
    data-tradingsymbol="${ticker}"
    data-transaction_type="BUY"
    data-quantity="${quantity}"
    data-order_type="${orderType}"${priceAttribute}>
    Buy ${ticker} stock
  </kite-button>
  `;
  
    return htmlSnippet;
  }
