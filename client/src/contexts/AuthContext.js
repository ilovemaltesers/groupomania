import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Update authToken state if token changes in localStorage
    if (token !== authToken) {
      setAuthToken(token);
    }
  }, []); // Runs only once on component mount

  const login = (token) => {
    localStorage.setItem("token", token);
    // Update authToken state
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    // Update authToken state
    setAuthToken(null);
  };

  // Determine if the user is authenticated based on authToken
  //converts the authToken to a boolean value using the !! operator
  const isAuthenticated = !!authToken;

  // Render the AuthContext Provider with value containing authentication state and functions
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuthenticated, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
