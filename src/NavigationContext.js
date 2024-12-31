// NavigateContext.js
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for Navigation
const NavigateContext = createContext();

// Create a custom hook to use navigate from context
export const useNavigateContext = () => useContext(NavigateContext);

// Create a provider component
export const NavigateProvider = ({ children }) => {
  const navigate = useNavigate();

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};
