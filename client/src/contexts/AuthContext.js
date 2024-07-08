import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    return token ? { token, userId, userName } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (
      (token && (!auth || token !== auth.token)) ||
      (userId && (!auth || userId !== auth.userId)) ||
      (userName && (!auth || userName !== auth.userName))
    ) {
      setAuth({ token, userId, userName });
    }
  }, []);

  const login = (token, userId, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    setAuth({ token, userId, userName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setAuth(null);
  };

  const isAuthenticated = !!auth?.token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
