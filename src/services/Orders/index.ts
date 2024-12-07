import axios from 'axios';
import { TradeDetails, TradeResponse } from '@utils/interface';

/**
 * Place a smart order
 * @param {object} tradeDetails - Details of the trade
 * @param {string} tradeDetails.apikey - API Key for authentication
 * @param {string} tradeDetails.symbol - Trading symbol
 * @param {string} tradeDetails.action - Action (e.g., BUY/SELL)
 * @param {string} tradeDetails.exchange - Exchange (e.g., NSE, BSE)
 * @param {string} tradeDetails.product - Product type (e.g., MIS, CNC)
 * @param {string} tradeDetails.quantity - Order quantity
 * @param {string} tradeDetails.apiUrl - API host URL
 * @returns {Promise<TradeResponse>} - API response
 */
export const placeOrder = async (
  tradeDetails: TradeDetails
): Promise<TradeResponse> => {
  try {
    const endpoint = `${tradeDetails.apiUrl}/api/v1/placeorder`;

    let payload: TradeDetails = {
      apikey: tradeDetails.apikey,
      strategy: tradeDetails.strategy,
      exchange: tradeDetails.exchange,
      symbol: tradeDetails.symbol,
      action: tradeDetails.action,
      product: tradeDetails.product,
      pricetype: tradeDetails.pricetype,
      quantity: `${tradeDetails.quantity}`,
    };
    if (tradeDetails.pricetype === 'LIMIT') {
      if (!tradeDetails.price || Number(tradeDetails.price) <= 0) throw new Error('Price must be greater than 0 for LIMIT orders');
      payload.price = `${tradeDetails.price}`;
    }

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
 * @param {string} modifyDetails.apikey - API Key for authentication
 * @param {string} modifyDetails.orderid - ID of the order to modify
 * @param {number} modifyDetails.price - New price
 * @param {string} modifyDetails.apiUrl - API host URL
 * @returns {Promise<TradeResponse>} - API response
 */
export const modifyOrder = async (
  modifyDetails: TradeDetails
): Promise<TradeResponse> => {
  try {
    const endpoint = `${modifyDetails.apiUrl}/api/v1/modifyorder`;
    const payload = {
      apikey: modifyDetails.apikey,
      orderid: modifyDetails.orderid,
      price: `${modifyDetails.price}`,
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
 * @param {string} cancelDetails.apikey - API Key for authentication
 * @param {string} cancelDetails.orderid - ID of the order to cancel
 * @param {string} cancelDetails.apiUrl - API host URL
 * @returns {Promise<TradeResponse>} - API response
 */
export const cancelOrder = async (
  cancelDetails: TradeDetails
): Promise<TradeResponse> => {
  try {
    const endpoint = `${cancelDetails.apiUrl}/api/v1/cancelorder`;
    const payload = {
      apikey: cancelDetails.apikey,
      orderid: cancelDetails.orderid,
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
 * @param {string} closeDetails.apikey - API Key for authentication
 * @param {string} closeDetails.symbol - Trading symbol
 * @param {string} closeDetails.exchange - Exchange (e.g., NSE, BSE)
 * @param {string} closeDetails.apiUrl - API host URL
 * @returns {Promise<TradeResponse>} - API response
 */
export const closePosition = async (
  closeDetails: TradeDetails
): Promise<TradeResponse> => {
  try {
    const endpoint = `${closeDetails.apiUrl}/api/v1/closeposition`;
    const payload = {
      apikey: closeDetails.apikey,
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
 * @param {string} cancelDetails.apikey - API Key for authentication
 * @param {string} cancelDetails.apiUrl - API host URL
 * @returns {Promise<TradeResponse>} - API response
 */
export const cancelAllOrders = async (
  cancelDetails: TradeDetails
): Promise<TradeResponse> => {
  try {
    const endpoint = `${cancelDetails.apiUrl}/api/v1/cancelallorders`;
    const payload = {
      apikey: cancelDetails.apikey,
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
  modifyOrder,
  cancelOrder,
  closePosition,
  cancelAllOrders,
};
