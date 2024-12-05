import { OrdersProvider } from '@contexts/Orders';
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the shape of your context state
interface AppState {
  // Add your state properties here
  user: string | null;
  isAuthenticated: boolean;
}

// Define the actions for your reducer
type Action =
  | { type: 'SET_USER'; payload: string }
  | { type: 'LOGOUT' };

// Create the initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
};

// Create the reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Create a provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <OrdersProvider>
        {children}
      </OrdersProvider>
    </AppContext.Provider>
  );
};

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};