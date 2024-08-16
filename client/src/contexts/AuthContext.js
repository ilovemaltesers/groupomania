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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    if (
      (token && (!auth || token !== auth.token)) ||
      (userId && (!auth || userId !== auth.userId)) ||
      (givenName && (!auth || givenName !== auth.givenName))
    ) {
      setAuth({ token, userId, givenName });
    }
  }, [auth]);

  const login = (token, userId, givenName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("givenName", givenName);

    setAuth({ token, userId, givenName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("posts");
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
