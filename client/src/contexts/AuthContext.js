// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// Custom hook to use the AuthContext

export const useAuth = () => useContext(AuthContext);

// Provider component to wrap the application with authentication context

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // useEffect hook to load token from localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set the token to state if it exists in localStorage
      setAuthToken(token);
    }
    // Empty dependency array ensures this effect runs only once when component mounts
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };
  // Render the AuthContext Provider with value containing authentication state and functions
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!authToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
