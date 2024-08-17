import React, {
  createContext, // Creates a context object for the authentication context.
  useState, // Hook for managing state in functional components.
  useEffect, // Hook for side effects like data fetching or subscribing to external events.
  useContext, // Hook for accessing context values in functional components.
  useMemo, // Hook for memoizing values to optimize performance.
} from "react";

// Create a Context for authentication. This will be used to pass authentication state and functions down the component tree.
const AuthContext = createContext();

// Custom hook for accessing the AuthContext. This simplifies using context in components.
export const useAuth = () => useContext(AuthContext);

// The provider component for AuthContext. It will wrap other components to provide authentication state and functions.
export const AuthProvider = ({ children }) => {
  // State to manage authentication details. It initializes with values from localStorage or null if not present.
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");

    return token ? { token, userId, givenName } : null;
  });

  // useEffect hook to synchronize the state with localStorage whenever `auth` changes.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const givenName = localStorage.getItem("givenName");

    // Update state if localStorage values change or if they are different from the current state.
    if (
      (token && (!auth || token !== auth.token)) ||
      (userId && (!auth || userId !== auth.userId)) ||
      (givenName && (!auth || givenName !== auth.givenName))
    ) {
      setAuth({ token, userId, givenName });
    }
  }, [auth]); // Depend on `auth` so the effect runs whenever `auth` changes.

  // Function to handle user login. It updates localStorage and state with the new authentication details.
  const login = (token, userId, givenName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("givenName", givenName);

    setAuth({ token, userId, givenName });
  };

  // Function to handle user logout. It clears localStorage and updates the state to null.
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("givenName");
    localStorage.removeItem("posts"); // Also removes `posts` item if present.
    setAuth(null);
  };

  // Determine if the user is authenticated based on the presence of the token.
  const isAuthenticated = !!auth?.token;

  // useMemo hook to memoize the context value, ensuring that it only changes when `auth` or `isAuthenticated` changes.
  const value = useMemo(
    () => ({
      isAuthenticated,
      auth,
      login,
      logout,
    }),
    [auth, isAuthenticated] // Dependencies for useMemo hook.
  );

  // Render the AuthContext provider with the current context value and children.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
