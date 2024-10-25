import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching auth data from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    const familyName = localStorage.getItem("familyName");
    const email = localStorage.getItem("email");
    const profilePicture = localStorage.getItem("profilePicture");

    if (token) {
      setAuth({ token, userId, givenName, familyName, email, profilePicture });
    } else {
      setAuth(null);
    }

    setLoading(false);
  }, []);

  const login = (
    token,
    userId,
    givenName,
    familyName,
    email,
    profilePicture
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("givenName", givenName);
    localStorage.setItem("familyName", familyName);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePicture", profilePicture);

    setAuth({ token, userId, givenName, familyName, email, profilePicture });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("familyName");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePicture");

    setAuth(null);
  };

  const updateProfilePicture = (newProfilePicture) => {
    localStorage.setItem("profilePicture", newProfilePicture);
    setAuth((prevAuth) => ({
      ...prevAuth,
      profilePicture: newProfilePicture,
    }));
  };

  const isAuthenticated = !!auth?.token;

  const value = useMemo(
    () => ({
      isAuthenticated,
      auth,
      login,
      logout,
      updateProfilePicture,
    }),
    [auth, isAuthenticated]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  // Provide the context to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
