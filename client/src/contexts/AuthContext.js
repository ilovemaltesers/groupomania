import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // If token exists, return an object with token and userId, otherwise return null
    return token ? { token, userId } : null;
  });

  // Effect to sync auth state with localStorage values
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // Update auth state if token or userId changes in localStorage
    if (
      (token && (!auth || token !== auth.token)) ||
      (userId && (!auth || userId !== auth.userId))
    ) {
      setAuth({ token, userId });
    }
    // eslint-disable-next-line
  }, []); // Runs only once on component mount

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setAuth({ token, userId });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setAuth(null);
  };

  // Determine if the user is authenticated based on the presence of a token
  const isAuthenticated = !!auth?.token;

  // Render the AuthContext Provider with value containing authentication state and functions
  return (
    <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
