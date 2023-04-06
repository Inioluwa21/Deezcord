import React, { createContext, useState } from 'react';


// Define the shape of the context object to be created
export const AuthContext = createContext({
  // isAuthenticated will default to false
  isAuthenticated: false,
  // setAuthenticated function will default to a no-op function
  setAuthenticated: (value) => {},

  currentChannel: false,
  setCurrentChannel: (value) => {},
});

// Define the AuthProvider component that wraps the app and provides the AuthContext object
export const AuthProvider = ({ children }) => {
  // Use the useState hook to set the initial state of isAuthenticated to false
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentChannel, setCurrentChannel] = useState();

  // Return the AuthContext.Provider component with the value of isAuthenticated and setAuthenticated functions
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        currentChannel,
        setCurrentChannel,
      }}
    >
      {/* Render the children components passed to AuthProvider */}
      {children}
    </AuthContext.Provider>
  );
};
