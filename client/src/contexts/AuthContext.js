import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");

    return token ? { token, userId, givenName } : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("userId", auth.userId);
      localStorage.setItem("givenName", auth.givenName);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("givenName");
      localStorage.removeItem("posts"); // Ensure posts are cleared as well
    }
  }, [auth]);

  const login = (token, userId, givenName) => {
    setAuth({ token, userId, givenName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("posts"); // Ensure posts are cleared
    setAuth(null);
  };

  const isAuthenticated = !!auth?.token;

  const value = useMemo(
    () => ({
      isAuthenticated,
      auth,
      login,
      logout,
    }),
    [auth, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
