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
    const familyName = localStorage.getItem("familyName");
    const email = localStorage.getItem("email");
    const profilePicture = localStorage.getItem("profilePicture");

    console.log("Initial auth state from localStorage:", {
      token,
      userId,
      givenName,
      familyName,
      email,
      profilePicture,
    });

    return token
      ? { token, userId, givenName, familyName, email, profilePicture }
      : null;
  });

  useEffect(() => {
    // Retrieve all values from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    const familyName = localStorage.getItem("familyName");
    const email = localStorage.getItem("email");
    const profilePicture = localStorage.getItem("profilePicture");

    console.log("Synchronizing state with localStorage:", {
      token,
      userId,
      givenName,
      familyName,
      email,
      profilePicture,
    });

    // Set the auth state if the data is present
    if (token && userId && givenName) {
      setAuth({ token, userId, givenName, familyName, email, profilePicture });
    }
  }, []);

  const login = (
    token,
    userId,
    givenName,
    familyName,
    email,
    profilePicture
  ) => {
    console.log("Logging in with:", {
      token,
      userId,
      givenName,
      familyName,
      email,
      profilePicture,
    });

    // Store each value in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("givenName", givenName);
    localStorage.setItem("familyName", familyName);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePicture", profilePicture);

    // Update the auth state with all fields
    setAuth({ token, userId, givenName, familyName, email, profilePicture });
  };

  const logout = () => {
    console.log("Logging out");

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("familyName");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePicture");

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

  console.log("Providing AuthContext value:", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
