import axios from "axios";
import { TradeDetails } from "../utils/interface";

/**
 * Place a smart order
 * @param {object} tradeDetails - Details of the trade
 * @param {string} tradeDetails.apiKey - API Key for authentication
 * @param {string} tradeDetails.symbol - Trading symbol
 * @param {string} tradeDetails.action - Action (e.g., BUY/SELL)
 * @param {string} tradeDetails.exchange - Exchange (e.g., NSE, BSE)
 * @param {string} tradeDetails.product - Product type (e.g., MIS, CNC)
 * @param {string} tradeDetails.quantity - Order quantity
 * @param {string} tradeDetails.hostUrl - API host URL
 * @returns {Promise<string>} - API response
 */
export const placeOrder = async (tradeDetails: TradeDetails): Promise<string> => {
  try {
    const endpoint = `${tradeDetails.hostUrl}/api/v1/placesmartorder`;

    const payload = {
      apikey: tradeDetails.apiKey,
      strategy: "FastScalper",
      symbol: tradeDetails.symbol,
      action: tradeDetails.action,
      exchange: tradeDetails.exchange,
      pricetype: "MARKET",
      product: tradeDetails.product,
      quantity: tradeDetails.quantity,
      position_size: "0",
    };

    const response = await axios.post(endpoint, payload, {
      timeout: 30000, // 30 seconds timeout
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `API request failed. Status: ${response.status}, Body: ${response.data}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `Error placing order: ${error.response?.data || error.message}`
    );
  }
};

/**
 * Modify an existing order
 * @param {object} modifyDetails - Details for modifying the order
 * @param {string} modifyDetails.apiKey - API Key for authentication
 * @param {string} modifyDetails.orderId - ID of the order to modify
 * @param {number} modifyDetails.price - New price
 * @param {string} modifyDetails.hostUrl - API host URL
 * @returns {Promise<string>} - API response
 */
export const modifyOrder = async (modifyDetails: {
  apiKey: string;
  orderId: string;
  price: number;
  hostUrl: string;
}): Promise<string> => {
  try {
    const endpoint = `${modifyDetails.hostUrl}/api/v1/modifyorder`;
    const payload = {
      apikey: modifyDetails.apiKey,
      order_id: modifyDetails.orderId,
      price: modifyDetails.price,
    };

    const response = await axios.post(endpoint, payload, {
      timeout: 30000,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error modifying order: ${error.message}`);
  }
};

/**
 * Cancel an order
 * @param {object} cancelDetails - Details of the order to cancel
 * @param {string} cancelDetails.apiKey - API Key for authentication
 * @param {string} cancelDetails.orderId - ID of the order to cancel
 * @param {string} cancelDetails.hostUrl - API host URL
 * @returns {Promise<string>} - API response
 */
export const cancelOrder = async (cancelDetails: {
  apiKey: string;
  orderId: string;
  hostUrl: string;
}): Promise<string> => {
  try {
    const endpoint = `${cancelDetails.hostUrl}/api/v1/cancelorder`;
    const payload = {
      apikey: cancelDetails.apiKey,
      order_id: cancelDetails.orderId,
    };

    const response = await axios.post(endpoint, payload, {
      timeout: 30000,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error canceling order: ${error.message}`);
  }
};

/**
 * Close a position
 * @param {object} closeDetails - Details of the position to close
 * @param {string} closeDetails.apiKey - API Key for authentication
 * @param {string} closeDetails.symbol - Trading symbol
 * @param {string} closeDetails.exchange - Exchange (e.g., NSE, BSE)
 * @param {string} closeDetails.hostUrl - API host URL
 * @returns {Promise<string>} - API response
 */
export const closePosition = async (closeDetails: {
  apiKey: string;
  symbol: string;
  exchange: string;
  hostUrl: string;
}): Promise<string> => {
  try {
    const endpoint = `${closeDetails.hostUrl}/api/v1/closeposition`;
    const payload = {
      apikey: closeDetails.apiKey,
      symbol: closeDetails.symbol,
      exchange: closeDetails.exchange,
    };

    const response = await axios.post(endpoint, payload, {
      timeout: 30000,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error closing position: ${error.message}`);
  }
};

/**
 * Cancel all active orders
 * @param {object} cancelDetails - Details for canceling all orders
 * @param {string} cancelDetails.apiKey - API Key for authentication
 * @param {string} cancelDetails.hostUrl - API host URL
 * @returns {Promise<string>} - API response
 */
export const cancelAllOrders = async (cancelDetails: {
  apiKey: string;
  hostUrl: string;
}): Promise<string> => {
  try {
    const endpoint = `${cancelDetails.hostUrl}/api/v1/cancelallorders`;
    const payload = {
      apikey: cancelDetails.apiKey,
    };

    const response = await axios.post(endpoint, payload, {
      timeout: 30000,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error canceling all orders: ${error.message}`);
  }
};

export default {
  placeOrder,
}