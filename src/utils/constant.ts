export const appRoute = {
  DEFAULT: '/',
  HOME: '/home',
  NOT_FOUND: '/not-found',
};
export const exchanges = {
  NSE: 'NSE',
  NFO: 'NFO',
  CDS: 'CDS',
  BSE: 'BSE',
  BFO: 'BFO',
  BCD: 'BCD',
  MCX: 'MCX',
  NCDEX: 'NCDEX',
};
export const productsType = {
  CNC: 'CNC',
  NRML: 'NRML',
  MIS: 'MIS',
  CO: 'CO',
  BO: 'BO',
};
export const priceTypes = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET',
  SL: 'SL',
  SL_M: 'SL-M',
};
export const actions = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export const DEFAULT_ORDER_DETAILS = {
  symbol: '',
  action: actions.BUY,
  exchange: exchanges.NSE,
  quantity: 25,
  product: productsType.MIS,
  pricetype: priceTypes.MARKET,
  price: 0,
  apikey: '',
  strategy: '',
  apiUrl: '',
};

export default {
  appRoute,
  exchanges,
  productsType,
  priceTypes,
  actions,
};
