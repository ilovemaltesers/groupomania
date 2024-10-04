import React, { createContext, useState, useContext, useMemo } from "react";

const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize auth state with values from localStorage
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");
    const familyName = localStorage.getItem("familyName");
    const email = localStorage.getItem("email");
    const profilePicture = localStorage.getItem("profilePicture");

    return token
      ? { token, userId, givenName, familyName, email, profilePicture }
      : {}; // Return empty object instead of null
  });

  // Login function to store auth data in localStorage and state
  const login = (
    token,
    userId,
    givenName,
    familyName,
    email,
    profilePicture
  ) => {
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

  // Logout function to remove auth data from localStorage and reset state
  const logout = () => {
    // Remove all auth data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("familyName");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePicture");

    // Reset auth state to empty object
    setAuth({});
  };

  // Check if the user is authenticated (based on the presence of a token)
  const isAuthenticated = !!auth?.token;

  // Memoize context value to optimize re-renders
  const value = useMemo(
    () => ({
      isAuthenticated,
      auth,
      login,
      logout,
    }),
    [auth, isAuthenticated]
  );

  // Provide the context to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
