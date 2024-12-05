// Define the structure for trade details
interface TradeDetails {
  index?: number;
  orderid?: string;
  apiUrl?: string;

  apikey: string;
  strategy: string;
  exchange: string;
  symbol: string;
  action: string;
  product: string;
  pricetype: string;
  quantity: number | string;
  price?: string | number;
  trigger_price?: string;
  disclosed_quantity?: string;
}

export type { TradeDetails };
