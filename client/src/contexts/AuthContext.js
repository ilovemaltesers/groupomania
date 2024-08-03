import React, { createContext, useState, useEffect, useContext } from "react";

// Create a new context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
// allows components to access the authentication context more easily
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps around the part of the app that needs access to auth context
// It will provide the auth context values to its children components
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initial state is derived from localStorage if available
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    // Return initial state, if token exists, otherwise null
    return token ? { token, userId, givenName } : null;
  });

  // Effect to synchronize the localStorage data with the auth state on component mount
  useEffect(() => {
    // Retrieve current values from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    // Check if the values in localStorage are different from current auth state
    if (
      (token && (!auth || token !== auth.token)) ||
      (userId && (!auth || userId !== auth.userId)) ||
      (givenName && (!auth || givenName !== auth.givenName))
    ) {
      // Update the auth state with new values if they are different
      setAuth({ token, userId, givenName });
    }
    // eslint-disable-next-line
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle user login
  const login = (token, userId, givenName) => {
    // Save authentication data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("givenName", givenName);
    // Update state with new auth data
    setAuth({ token, userId, givenName });
  };

  // Function to handle user logout
  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("posts"); // Presumably also remove posts data (if applicable)
    // Clear auth state
    setAuth(null);
  };

  // Determine if the user is authenticated based on the presence of a token
  const isAuthenticated = !!auth?.token;

  // Provide auth context values to the children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
