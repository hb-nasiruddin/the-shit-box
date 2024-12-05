import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import * as OrderServices from '@services/Orders';
import { TradeDetails } from '@utils/interface';

interface OrdersContextProps {
  placeOrder: (tradeDetails: TradeDetails) => Promise<string>;
  modifyOrder: (modifyDetails: {
    apiKey: string;
    orderId: string;
    price: number;
    hostUrl: string;
  }) => Promise<string>;
  cancelOrder: (cancelDetails: {
    apiKey: string;
    orderId: string;
    hostUrl: string;
  }) => Promise<string>;
  closePosition: (closeDetails: {
    apiKey: string;
    symbol: string;
    exchange: string;
    hostUrl: string;
  }) => Promise<string>;
  cancelAllOrders: (cancelDetails: {
    apiKey: string;
    hostUrl: string;
  }) => Promise<string>;

  addOrder: () => void;
  deleteOrder: (index: number) => void;

  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  strategy: string;
  setStrategy: React.Dispatch<React.SetStateAction<string>>;
  orders: Array<any>;
  setOrders: React.Dispatch<React.SetStateAction<Array<any>>>;
  hostUrl: string;
  setHostUrl: React.Dispatch<React.SetStateAction<string>>;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  // State variables
  const [apiUrl, setApiUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const [orders, setOrders] = useState<Array<TradeDetails>>([]);
  const [hostUrl, setHostUrl] = useState<string>("");

  // Service functions using useCallback
  const placeOrder = useCallback(
    async (tradeDetails: TradeDetails) => {
      try {
        const data = await OrderServices.placeOrder(tradeDetails);
        console.log("Order Placed data", data);
        // Update orders state on successful order placement
        // setOrders((prevOrders) => [...prevOrders, { ...tradeDetails, data }]);
        return data;
      } catch (error) {
        console.log("Error placing order", error);
      }
    },
    [setOrders]
  );

  const modifyOrder = useCallback(
    async (modifyDetails: {
      apiKey: string;
      orderId: string;
      price: number;
      hostUrl: string;
    }) => {
      const response = await OrderServices.modifyOrder(modifyDetails);
      return response;
    },
    []
  );

  const cancelOrder = useCallback(
    async (cancelDetails: {
      apiKey: string;
      orderId: string;
      hostUrl: string;
    }) => {
      const response = await OrderServices.cancelOrder(cancelDetails);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== cancelDetails.orderId)
      );
      return response;
    },
    [setOrders]
  );

  const closePosition = useCallback(
    async (closeDetails: {
      apiKey: string;
      symbol: string;
      exchange: string;
      hostUrl: string;
    }) => {
      const response = await OrderServices.closePosition(closeDetails);
      return response;
    },
    []
  );

  const cancelAllOrders = useCallback(
    async (cancelDetails: { apiKey: string; hostUrl: string }) => {
      const response = await OrderServices.cancelAllOrders(cancelDetails);
      setOrders([]);
      return response;
    },
    [setOrders]
  );


  const addOrder = useCallback(() => {
    setOrders([
      ...orders,
      {
        symbol: '',
        action: 'BUY',
        exchange: 'NSE',
        quantity: 25,
        product: 'MIS',
        pricetype: 'MARKET',
        price: 0,
      },
    ]);
  }, [setOrders, orders]);


  const deleteOrder = useCallback((index: number) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  }, [setOrders, orders]);


  // Hooks
  // Fetch data from local storage
  useEffect(() => {
    const fetchData = async () => {
      const storedApiUrl = localStorage.getItem('apiUrl');
      const storedApiKey = localStorage.getItem('apiKey');
      const storeStrategy = localStorage.getItem('strategy');
      const storedActiveSection = localStorage.getItem('orders');

      if (storedApiUrl) setApiUrl(storedApiUrl);
      if (storedApiKey) setApiKey(storedApiKey);
      if (storeStrategy) setStrategy(storeStrategy);
      if (storedActiveSection) setOrders(JSON.parse(storedActiveSection));
    };

    fetchData();
  }, []);


  // Save data to local storage
  useEffect(() => {
    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('strategy', strategy);
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [apiUrl, apiKey, strategy, orders]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      placeOrder,
      modifyOrder,
      cancelOrder,
      closePosition,
      cancelAllOrders,
      addOrder,
      deleteOrder,
      apiUrl,
      setApiUrl,
      apiKey,
      setApiKey,
      strategy,
      setStrategy,
      orders,
      setOrders,
      hostUrl,
      setHostUrl,
    }),
    [
      placeOrder,
      modifyOrder,
      cancelOrder,
      closePosition,
      cancelAllOrders,
      addOrder,
      deleteOrder,
      apiUrl,
      setApiUrl,
      apiKey,
      setApiKey,
      strategy,
      setStrategy,
      orders,
      setOrders,
      hostUrl,
      setHostUrl,
    ]
  );

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextProps => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};