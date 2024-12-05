import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
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
  const [orders, setOrders] = useState<Array<any>>([]);
  const [hostUrl, setHostUrl] = useState<string>("");

  // Service functions using useCallback
  const placeOrder = useCallback(
    async (tradeDetails: TradeDetails) => {
      const response = await OrderServices.placeOrder(tradeDetails);
      // Update orders state on successful order placement
      setOrders((prevOrders) => [...prevOrders, { ...tradeDetails, response }]);
      return response;
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

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      placeOrder,
      modifyOrder,
      cancelOrder,
      closePosition,
      cancelAllOrders,
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