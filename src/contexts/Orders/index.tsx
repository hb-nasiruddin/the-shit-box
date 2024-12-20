import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import * as OrderServices from '@services/Orders';
import { TradeDetails, TradeResponse } from '@utils/interface';
import { DEFAULT_ORDER_DETAILS } from '@utils/constant';

interface OrdersContextProps {
  placeOrder: (index: number, tradeDetails: TradeDetails) => Promise<TradeResponse | any>;
  modifyOrder: (modifyDetails: TradeDetails) => Promise<TradeResponse | any>;
  cancelOrder: (cancelDetails: TradeDetails) => Promise<TradeResponse | any>;
  closePosition: (closeDetails: TradeDetails) => Promise<TradeResponse | any>;
  cancelAllOrders: (cancelDetails: TradeDetails) => Promise<TradeResponse | any>;

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
}

export const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  // State variables
  const [apiUrl, setApiUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const [orders, setOrders] = useState<Array<TradeDetails>>([]);

  // Service functions using useCallback
  const placeOrder = useCallback(
    async (index: number, tradeDetails: TradeDetails) => {
      try {
        const data = await OrderServices.placeOrder(tradeDetails);
        console.log("Order Placed data", data);
        // Update orders state on successful order placement
        const updatedOrders = [...orders];
        updatedOrders[index] = { ...updatedOrders[index], orderid: data.orderid };

        return updatedOrders;
      } catch (error) {
        console.log("Error placing order", error);
      }
    },
    [setOrders]
  );

  const modifyOrder = useCallback(
    async (modifyDetails: TradeDetails) => {
      const response = await OrderServices.modifyOrder(modifyDetails);
      return response;
    },
    []
  );

  const cancelOrder = useCallback(
    async (cancelDetails: TradeDetails) => {
      const response = await OrderServices.cancelOrder(cancelDetails);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderid !== cancelDetails.orderid)
      );
      return response;
    },
    [setOrders]
  );

  const closePosition = useCallback(
    async (closeDetails: TradeDetails) => {
      const response = await OrderServices.closePosition(closeDetails);
      return response;
    },
    []
  );

  const cancelAllOrders = useCallback(
    async (cancelDetails: TradeDetails) => {
      const response = await OrderServices.cancelAllOrders(cancelDetails);
      setOrders([]);
      return response;
    },
    [setOrders]
  );

  const addOrder = useCallback(() => {
    setOrders([...orders, {
      ...DEFAULT_ORDER_DETAILS,
      apikey: apiKey,
      strategy: strategy,
      apiUrl: apiUrl,
    }]);
    return orders;
  }, [orders, setOrders]);

  const deleteOrder = useCallback((index: number) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
    return newOrders;
  }, [orders, setOrders]);


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

    return () => {
      setApiUrl("");
      setApiKey("");
      setStrategy("");
      setOrders([]);
    };
  }, []);


  // Save data to local storage
  useEffect(() => {
    console.log("Save data to local storage");

    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('strategy', strategy);
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [apiUrl, apiKey, strategy, orders]);


  // Update orders on apiKey, strategy, apiUrl change
  useEffect(() => {
    const updatedOrders = orders.map((order) => ({
      ...order,
      apikey: apiKey,
      strategy: strategy,
      apiUrl: apiUrl,
    }));
    setOrders(updatedOrders);

    return () => {
      setOrders([]);
    };
  }, [apiKey, strategy, apiUrl]);

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
      setOrders
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
      setOrders
    ]
  );

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

// export const useOrders = (): any => useContext(OrdersContext);

export const useOrders = (): OrdersContextProps => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};