// Define the structure for trade details
interface TradeDetails {
  action: string;
  symbol: string;
  quantity: string;
  apiKey: string;
  exchange: string;
  product: string;
  hostUrl: string;
}

export type{ 
  TradeDetails
};